import React, { useState } from 'react';
import { Card, FlexBoxRow, FlexBoxCol, Button, Ellipsis, Input } from "./styled/styled";

export const NoSiteContent = () => (
    <Card>
        <p>No site is currently hosted for this domain.</p>
    </Card>
);


export const SiteByTemplateContent = ({ onSave }) => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [telegramDetails, setTelegramDetails] = useState('');
    const [tonWallet, setTonWallet] = useState('');
    const [displayNFTs, setDisplayNFTs] = useState(false);

    return (
        <Card>
            <FlexBoxCol>
                <label htmlFor="bgImage">Background Image (Optional)</label>
                <Input id="bgImage" type="file" onChange={(e) => setBackgroundImage(e.target.files[0])} />
                <label htmlFor="title">Title</label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="description">Description</label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="picture">Picture (Optional)</label>
                <Input id="picture" type="file" onChange={(e) => setPicture(e.target.files[0])} />
                <label htmlFor="telegramDetails">Telegram Details</label>
                <Input id="telegramDetails" value={telegramDetails} onChange={(e) => setTelegramDetails(e.target.value)} />
                <label htmlFor="tonWallet">TON Wallet</label>
                <Input id="tonWallet" value={tonWallet} onChange={(e) => setTonWallet(e.target.value)} />
                <label htmlFor="displayNFTs">Display NFTs</label>
                <Input id="displayNFTs" type="checkbox" checked={displayNFTs} onChange={(e) => setDisplayNFTs(e.target.checked)} />
                <Button onClick={() => onSave({ backgroundImage, title, description, picture, telegramDetails, tonWallet, displayNFTs })}>
                    Save Template
                </Button>
            </FlexBoxCol>
        </Card>
    );
};


export const ProxyContent = ({ onSetProxy }) => {
    const [proxyUrl, setProxyUrl] = useState('');

    return (
        <Card>
            <FlexBoxCol>
                <label htmlFor="proxyUrl">Enter URL to Proxy</label>
                <Input id="proxyUrl" value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)} />
                <Button onClick={() => onSetProxy(proxyUrl)}>Set Proxy</Button>
            </FlexBoxCol>
        </Card>
    );
};

export const RedirectContent = ({ onSetRedirect }) => {
    const [redirectUrl, setRedirectUrl] = useState('');

    return (
        <Card>
            <FlexBoxCol>
                <label htmlFor="redirectUrl">Enter URL to Redirect to</label>
                <Input id="redirectUrl" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)} />
                <Button onClick={() => onSetRedirect(redirectUrl)}>Set Redirect</Button>
            </FlexBoxCol>
        </Card>
    );
};
