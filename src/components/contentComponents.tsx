import React, { useState } from 'react';
import { Card, FlexBoxRow, FlexBoxCol, Button, Ellipsis, Input } from "./styled/styled.js";
import { getSiteData } from "../hooks/useBackend.js";
import { Switch, TemplatePreview } from "./comps.jsx";
import './toggler.css';
export const NoSiteContent = ({ onSetProxy }) => (
    <Card>
        <FlexBoxCol>
            <p>Don't host anything.</p>
            <Button onClick={async () => await onSetProxy(null)}>Save</Button>
        </FlexBoxCol>
    </Card>
);


export const SiteByTemplateContent = ({ onSave, domain }) => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [telegramDetails, setTelegramDetails] = useState('');
    const [tonWallet, setTonWallet] = useState(true);
    const [displayNFTs, setDisplayNFTs] = useState(false);

    if (!title && !description) {
        getSiteData(domain).then((site_data) => {
            if (site_data) {
                setTitle(site_data.title);
                setDescription(site_data.description);
            }
            console.log("SITE DATA\n\n\n", site_data)
            if (site_data.contacts) {
                console.log("Telegram Details")
                console.log(site_data.contacts.wallet)
                setTelegramDetails(site_data.contacts.telegram);
                console.log(tonWallet)
            }
        })
    }

    return (
        <Card>
            <FlexBoxCol>
                {/*<label htmlFor="bgImage">Background Image (Optional)</label>*/}
                {/*<Input id="bgImage" type="file" onChange={(e) => setBackgroundImage(e.target.files[0])} />*/}
                {/* put tem1.gif for information - rounded and stuff */}
                <div style={
                    {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }
                }><TemplatePreview picture={"/tem1.gif"} /></div>
                <div style={{ display: 'grid', gap: '5px', margin: '5px 0px 5x 0px' }}>
                    <label htmlFor="title">Title</label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gap: '5px', margin: '5px 0px 5px 0px' }}>
                    <label htmlFor="description">Description</label>
                    <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                {/*<label htmlFor="picture">Picture (Optional)</label>*/}
                {/*<Input id="picture" type="file" onChange={(e) => setPicture(e.target.files[0])} />*/}
                <div style={{ display: 'grid', gap: '5px', margin: '5px 0px 5px 0px' }}>
                    <label htmlFor="telegramDetails">Telegram Details</label>
                    <Input id="telegramDetails" value={telegramDetails}
                        onChange={(e) => setTelegramDetails(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gap: '5px', margin: '5px 0px 10px 0px' }}>
                    <label htmlFor="tonWallet">TON Wallet</label>
                    {/*<Input id="tonWallet" value={tonWallet} onChange={(e) => setTonWallet(e.target.value)}/>*/}
                    <Switch id="tonWallet" initialState={tonWallet} onToggle={(e) => setTonWallet(e.target)} />
                </div>
                {/*<Input id="displayNFTs" type="checkbox" checked={displayNFTs}*/}
                {/*       onChange={(e) => setDisplayNFTs(e.target.checked)}/>*/}
                <Button onClick={async () => await onSave({
                    backgroundImage,
                    title,
                    description,
                    picture,
                    telegramDetails,
                    tonWallet,
                    displayNFTs
                })}>
                    Save Template
                </Button>
            </FlexBoxCol>
        </Card>
    );
};


export const ProxyContent = ({ onSetProxy, domainRecord }: { onSetProxy: (url: string) => Promise<void>, domainRecord: string }) => {
    let [proxyUrl, setProxyUrl] = useState('');
    if (domainRecord && !proxyUrl) {
        proxyUrl = domainRecord;
    }

    return (
        <div className="p-5 rounded-lg bg-telegram-bg">
            <div className="flex flex-col gap-2.5 font-normal text-telegram-text items-center">
                <p>We allow you to set an ADNL address or a usual website here (in that case, we will proxy it for
                    you)</p>
                <label htmlFor="proxyUrl">Enter URL to Proxy</label>
                <input
                    id="proxyUrl"
                    value={proxyUrl}
                    onChange={(e) => setProxyUrl(e.target.value)}
                    className="p-2.5 rounded-lg w-full border border-gray-300 dark:border-gray-600 font-normal text-gray-700 dark:text-gray-300"
                />
                <button
                    onClick={async () => await onSetProxy(proxyUrl)}
                    className="bg-telegram-button text-telegram-button-text rounded-lg py-5 px-5 font-normal cursor-pointer whitespace-nowrap"
                >
                    Set Proxy
                </button>
            </div>
        </div>
    );
};

export const RedirectContent = ({ onSetRedirect }) => {
    const [redirectUrl, setRedirectUrl] = useState('');

    return (
        <Card>
            <FlexBoxCol>
                <label htmlFor="redirectUrl">Enter URL to Redirect to</label>
                <Input id="redirectUrl" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)} />
                <Button onClick={async () => await onSetRedirect(redirectUrl)}>Set Redirect</Button>
            </FlexBoxCol>
        </Card>
    );
};
