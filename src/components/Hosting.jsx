import React, {useState, useEffect} from 'react';
import {AppContainer, ContentBox, DomainSelector, HostingOptionTabs, Tab, DomainRow, DomainCard} from './comps.jsx';
import {NoSiteContent, SiteByTemplateContent, ProxyContent, RedirectContent} from './contentComponents';
import {fetchTonDnsDomains, getDomainData, setADNLRecord} from "../hooks/useTonClient";
import {useTonConnect} from "../hooks/useTonConnect";
import {CHAIN} from "@tonconnect/protocol";
import {setSiteData} from "../hooks/useBackend";

export function Hosting() {
    const [domains, setDomains] = useState([]);
    const [selectedDomainAddress, setSelectedDomainAddress] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [domainRecord, setDomainRecord] = useState('');
    const [hostingOption, setHostingOption] = useState('noSite');
    const { wallet, network, sender } = useTonConnect(); // Use hooks at the top level
    const useTestnet = network !== CHAIN.MAINNET;

    const chooseDomain = async (domain, address) => {
        setSelectedDomain(domain);
        setSelectedDomainAddress(address);
        let record = await getDomainData(domain, address);
        console.log(record)
        setDomainRecord(record);
        if (record === import.meta.env.VITE_OUR_ADNL) {
            setHostingOption('siteByTemplate');
        } else if (record) {
            setHostingOption('proxy');
        } else {
            setHostingOption('noSite');
        }
    }

    useEffect(() => {
        if (wallet) {
            fetchTonDnsDomains(wallet, useTestnet)
                .then(setDomains)
                .catch(console.error);
        }
    }, [wallet, useTestnet]);

    const renderDomainCards = () => {
        return domains.map(domain => (
            <DomainCard
                key={domain.domain}
                picture={domain.picture}
                active={selectedDomain === domain.domain}
                onClick={async () => await chooseDomain(domain.domain, domain.address)}
            />
        ));
    };




    const handleSaveTemplate = async (data) => {
        if (domainRecord !== import.meta.env.VITE_OUR_ADNL) {
            await setADNLRecord(selectedDomainAddress, import.meta.env.VITE_OUR_ADNL, sender);
        }
        await setSiteData({
            domain: selectedDomain,
            proxy: "",
            redirect: "",
            template_id: "1",
            title: data.title,
            description: data.description,
        });
    };

    const handleSetProxy = async (proxyUrl) => {
        // Implement setting the proxy for the selected domain
        // Placeholder for setting the proxy
        console.log('Setting proxy:', proxyUrl);
        // if it doesn't contain ".", it's an ADNL address
        if (!proxyUrl.includes(".")) {
            await setADNLRecord(selectedDomain, proxyUrl, sender);
            setDomainRecord(proxyUrl);
            return;
        }
        await setADNLRecord(selectedDomain, import.meta.env.VITE_OUR_ADNL, sender);
        await setSiteData({
            domain: selectedDomain,
            proxy: proxyUrl,
            redirect: "",
        })
    };

    const handleSetRedirect = async (redirectUrl) => {
        // Implement setting the redirect for the selected domain
        // Placeholder for setting the redirect
        console.log('Setting redirect:', redirectUrl);
        await setADNLRecord(selectedDomain, import.meta.env.VITE_OUR_ADNL, sender);
        await setSiteData({
            domain: selectedDomain,
            proxy: "",
            redirect: redirectUrl,
        })
    };

    const renderContent = () => {
        switch (hostingOption) {
            case 'noSite':
                return <NoSiteContent/>;
            case 'siteByTemplate':
                return <SiteByTemplateContent onSave={handleSaveTemplate} domain={selectedDomain}/>;
            case 'proxy':
                return <ProxyContent onSetProxy={handleSetProxy} domainRecord={domainRecord}/>;
            case 'redirect':
                return <RedirectContent onSetRedirect={handleSetRedirect}/>;
            default:
                return <NoSiteContent/>;
        }
    };

    return (
        <AppContainer>
            <h1>Select Your Domain</h1>
            <DomainRow>
                {renderDomainCards()}
            </DomainRow>
            <HostingOptionTabs>
                <Tab active={hostingOption === 'noSite'} onClick={() => setHostingOption('noSite')}>No Site</Tab>
                <Tab active={hostingOption === 'siteByTemplate'} onClick={() => setHostingOption('siteByTemplate')}>Site
                    by Template</Tab>
                <Tab active={hostingOption === 'proxy'} onClick={() => setHostingOption('proxy')}>Proxy</Tab>
                <Tab active={hostingOption === 'redirect'} onClick={() => setHostingOption('redirect')}>Redirect</Tab>
            </HostingOptionTabs>
            <ContentBox>
                {renderContent()}
            </ContentBox>
        </AppContainer>
    );
}
