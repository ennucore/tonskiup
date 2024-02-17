import React, { useState, useEffect } from 'react';
import { AppContainer, ContentBox, DomainSelector, HostingOptionTabs, StyledTab, DomainRow, DomainCard } from './comps.jsx';
import { NoSiteContent, SiteByTemplateContent, ProxyContent, RedirectContent } from './contentComponents';
import { fetchTonDnsDomains, getDomainData, setADNLRecord } from "../hooks/useTonClient";
import { useTonConnect } from "../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { setSiteData } from "../hooks/useBackend";
import { Button } from "./styled/styled";
import WebApp from '@twa-dev/sdk'
import { useScroll } from "react-use-gesture";
import EmptyBlankIcon from "./icons/EmptyBlankIcon.jsx"
import BusinessCardIcon from "./icons/BusinessCardIcon.jsx"
import ProxyIcon from "./icons/ProxyIcon.jsx"
import RedirectIcon from "./icons/RedirectIcon.jsx"

export function Hosting() {
    const [domains, setDomains] = useState([]);
    const [selectedDomainAddress, setSelectedDomainAddress] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [domainRecord, setDomainRecord] = useState('');
    const [hostingOption, setHostingOption] = useState('noSite');
    const { wallet, network, sender } = useTonConnect(); // Use hooks at the top level
    const useTestnet = network !== CHAIN.MAINNET;
    const [isLoading, setIsLoading] = useState(true);

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
                //.then(domains => setDomains([...domains, ...domains, ...domains, ...domains, ...domains, ...domains, ...domains]))
                .catch(console.error);
        }
    }, [wallet, useTestnet]);

    useEffect(() => {
        if (domains.length > 0) {
            chooseDomain(domains[0].domain, domains[0].address);
        }
    }, [domains]);

    useEffect(() => {
        // Таймер на 60 секунд
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (domains.length != 0) {
            setIsLoading(false);
        }
    }, [domains]);

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
            contacts: { telegram: data.telegramDetails, wallet: data.tonWallet ? wallet : "" },
        });
    };

    const handleSetProxy = async (proxyUrl) => {
        // Implement setting the proxy for the selected domain
        // Placeholder for setting the proxy
        console.log('Setting proxy:', proxyUrl);
        // if it doesn't contain ".", it's an ADNL address
        if (!proxyUrl.includes(".")) {
            await setADNLRecord(selectedDomainAddress, proxyUrl, sender);
            setDomainRecord(proxyUrl);
            return;
        }
        await setADNLRecord(selectedDomainAddress, import.meta.env.VITE_OUR_ADNL, sender);
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
        await setADNLRecord(selectedDomainAddress, import.meta.env.VITE_OUR_ADNL, sender);
        await setSiteData({
            domain: selectedDomain,
            proxy: "",
            redirect: redirectUrl,
        })
    };

    const renderContent = () => {
        switch (hostingOption) {
            case 'noSite':
                return <NoSiteContent onSetProxy={handleSetProxy} />;
            case 'siteByTemplate':
                return <SiteByTemplateContent onSave={handleSaveTemplate} domain={selectedDomain} />;
            case 'proxy':
                return <ProxyContent onSetProxy={handleSetProxy} domainRecord={domainRecord} />;
            case 'redirect':
                return <RedirectContent onSetRedirect={handleSetRedirect} />;
            default:
                return <NoSiteContent onSetProxy={handleSetProxy} />;
        }
    };

    return (
        wallet && 
            (<AppContainer>
                {isLoading ? (
                <div style={{ fontFamily: 'GothamRounded', whiteSpace: 'nowrap', color: 'var(--tg-theme-text-color)', marginTop: "70px" }}>
                    <h1>Loading...</h1>
                </div>
                ) : domains.length == 0 ? (
                    <div style={{ fontFamily: 'GothamRounded', whiteSpace: 'nowrap', color: 'var(--tg-theme-text-color)', marginTop: "70px" }}>
                        <h1>You don't have any TON DNS domains, please visit
                            <a href="http://dns.ton.org" target="_blank" rel="noopener noreferrer">dns.ton.org</a>
                        </h1>
                    </div>
                ) : (
                    <>
                        <h1 style={{ fontFamily: 'GothamRounded', whiteSpace: 'nowrap', color: 'var(--tg-theme-text-color)', marginTop: "70px" }}>Select Your Domain</h1>
                        <DomainRow>
                            {renderDomainCards()}
                        </DomainRow>
                        <HostingOptionTabs style={{ display: 'display' }}>
                            {/* <div className={tabContainer: ${isMobile ? 'mobile' : ''}}> */}
                            <StyledTab active={hostingOption === 'noSite'} onClick={() => setHostingOption('noSite')}><EmptyBlankIcon/>No Site</StyledTab>
                            <StyledTab active={hostingOption === 'siteByTemplate'} onClick={() => setHostingOption('siteByTemplate')}><BusinessCardIcon/>By Template</StyledTab>
                            <StyledTab active={hostingOption === 'proxy'} onClick={() => setHostingOption('proxy')}><ProxyIcon/>Proxy</StyledTab>
                            <StyledTab active={hostingOption === 'redirect'} onClick={() => setHostingOption('redirect')}><RedirectIcon/>Redirect</StyledTab>
                            {/* </div> */}
                        </HostingOptionTabs>
                        <ContentBox>
                            {renderContent()}
                        </ContentBox>
                        <Button style={
                            {
                                minWidth: '50%'
                            }
                        } onClick={() => window.open(`https://${selectedDomain}.ski`)}>View your website</Button>
                    </>
                )}
            </AppContainer>
        )
    );
}
