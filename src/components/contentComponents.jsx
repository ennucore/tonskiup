import React, {useState} from 'react';
import {Card, FlexBoxRow, FlexBoxCol, Button, Ellipsis, Input} from "./styled/styled";
import {getSiteData} from "../hooks/useBackend";

import './toggler.css';

export const NoSiteContent = () => (
    <Card>
        <p>No site is currently hosted for this domain.</p>
    </Card>
);


export const SiteByTemplateContent = ({onSave, domain}) => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [telegramDetails, setTelegramDetails] = useState('');
    const [tonWallet, setTonWallet] = useState('');
    const [displayNFTs, setDisplayNFTs] = useState(false);
    if (!title && !description) {
        getSiteData(domain).then((site_data) => {
            if (site_data) {
                setTitle(site_data.title);
                setDescription(site_data.description);
            }
        })
    }

    return (
        <Card>
            <FlexBoxCol>
                {/*<label htmlFor="bgImage">Background Image (Optional)</label>*/}
                {/*<Input id="bgImage" type="file" onChange={(e) => setBackgroundImage(e.target.files[0])} />*/}
                <div style={{display: 'grid', gap: '5px', margin: '10px 0px 10px 0px'}}>
                    <label htmlFor="title">Title</label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div style={{display: 'grid', gap: '5px', margin: '10px 0px 10px 0px'}}>
                    <label htmlFor="description">Description</label>
                    <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                {/*<label htmlFor="picture">Picture (Optional)</label>*/}
                {/*<Input id="picture" type="file" onChange={(e) => setPicture(e.target.files[0])} />*/}
                <div style={{display: 'grid', gap: '5px', margin: '10px 0px 10px 0px'}}>
                    <label htmlFor="telegramDetails">Telegram Details</label>
                    <Input id="telegramDetails" value={telegramDetails}
                        onChange={(e) => setTelegramDetails(e.target.value)}/>
                </div>
                <div style={{display: 'grid', gap: '5px', margin: '10px 0px 10px 0px'}}>
                    <label htmlFor="tonWallet">TON Wallet</label>
                    <Input id="tonWallet" value={tonWallet} onChange={(e) => setTonWallet(e.target.value)}/>
                </div>
                <div style={{ display: 'flex', gridTemplateColumns: 'auto auto', gap: '10px', alignItems: 'center', margin: '10px 0px 20px 0px'}}>
                    <label htmlFor="displayNFTs" style={{}}>Display NFTs</label>
                    <label className="toggler-wrapper style-1" id="displayNFTs" type="checkbox" checked={displayNFTs} onChange={(e) => setDisplayNFTs(e.target.checked)}>
                        <input type="checkbox" />
                        <div className="toggler-slider">
                            <div className="toggler-knob"></div>
                        </div>
                    </label>
                </div>
                <Button style= {{fontFamily: 'Raleway', fontSize: '20px'}} onClick={async () => await onSave({
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


export const ProxyContent = ({onSetProxy, domainRecord}) => {
    let [proxyUrl, setProxyUrl] = useState('');
    if (domainRecord && !proxyUrl) {
        proxyUrl = domainRecord;
    }

    return (
        <Card>
            <FlexBoxCol>
                <p>We allow you to set an ADNL address or a usual website here (in that case, we will proxy it for
                    you)</p>
                <label htmlFor="proxyUrl">Enter URL to Proxy</label>
                <Input id="proxyUrl" value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)}/>
                <Button onClick={async () => await onSetProxy(proxyUrl)}>Set Proxy</Button>
            </FlexBoxCol>
        </Card>
    );
};

export const RedirectContent = ({onSetRedirect}) => {
    const [redirectUrl, setRedirectUrl] = useState('');

    return (
        <Card>
            <FlexBoxCol>
                <label htmlFor="redirectUrl">Enter URL to Redirect to</label>
                <Input id="redirectUrl" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)}/>
                <Button onClick={async () => await onSetRedirect(redirectUrl)}>Set Redirect</Button>
            </FlexBoxCol>
        </Card>
    );
};
