import React, {useState, useEffect} from 'react';
import {AppContainer, ContentBox, DomainSelector, HostingOptionTabs, Tab, DomainRow, DomainCard} from './comps.jsx';
import {NoSiteContent, SiteByTemplateContent, ProxyContent, RedirectContent} from './contentComponents';
import { fetchTonDnsDomains} from "../hooks/useTonClient";
import {useTonConnect} from "../hooks/useTonConnect";
import {CHAIN} from "@tonconnect/protocol";

export function Hosting() {
    const [domains, setDomains] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [hostingOption, setHostingOption] = useState('noSite');
    const { wallet, network } = useTonConnect(); // Use hooks at the top level
    const useTestnet = network !== CHAIN.MAINNET;

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
                onClick={() => setSelectedDomain(domain.domain)}
            />
        ));
    };



    const handleSaveTemplate = (title, description) => {
        // Implement saving the template for the selected domain
        // Placeholder for saving the template
        console.log('Saving template:', title, description);
    };

    const handleSetProxy = (proxyUrl) => {
        // Implement setting the proxy for the selected domain
        // Placeholder for setting the proxy
        console.log('Setting proxy:', proxyUrl);
    };

    const handleSetRedirect = (redirectUrl) => {
        // Implement setting the redirect for the selected domain
        // Placeholder for setting the redirect
        console.log('Setting redirect:', redirectUrl);
    };

    const renderContent = () => {
        switch (hostingOption) {
            case 'noSite':
                return <NoSiteContent/>;
            case 'siteByTemplate':
                return <SiteByTemplateContent onSave={handleSaveTemplate}/>;
            case 'proxy':
                return <ProxyContent onSetProxy={handleSetProxy}/>;
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
