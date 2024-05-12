import { TonConnect, TonConnectButton, useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useState, type FC, type ReactNode } from 'react';

import { Page } from '~/components/Page/Page.tsx';

import './TONConnectPage.css';

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const [gid, setGid] = useState("")
  const [giveaways, setGiveaways] = useState<null | any[]>(null)

  useEffect(() => {
    if(wallet?.account.address){
      fetch(`https://myback.loca.lt/participants/${userFriendlyAddress}`,{
        method: "GET",
      }).then((response) => response.json())
        .then((data) => {
          setGiveaways(data)
          console.log(giveaways)
        })
    }

  }, [wallet])

  let content: ReactNode;

  function checkinUser(){
    fetch(`https://myback.loca.lt/giveaways/${gid}/checkin`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({receiverAddress:userFriendlyAddress})
    }).then((data => data.json())).then(res => console.log(res))
  }
  

  if (wallet) {
    content = (
      <>
      <input type="text" value={gid} onChange={(e) => setGid(e.target.value)}/>
      <button onClick={() => {checkinUser()}}>checkin</button>
      <div className="cards">
      {giveaways && giveaways.map((el) => (  
        <div className="card" key={el.id}>  
          <p>{el.amount}T</p>
          <p>{el.type}</p>
          <p>{el.endsAt}</p>
          <br />
        </div>
      ))}
      </div>

    </>
    );
  } else {
    content = (
      <p>
        To display the data related to the TON Connect, it is required to connect your wallet.
      </p>
    );
  }

  return (
    <Page title="TON Connect">
    {/* <div className="nft">
    <div className='main'>
      <img className='tokenImage' src="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="NFT" />
      <h2>Kibertopiks #4269</h2>
      <p className='description'>Our Kibertopiks will give you nothing, waste your money on us.</p>
      <div className='tokenInfo'>
        <div className="price">
          <ins>◘</ins>
          <p>0.031 ETH</p>
        </div>
        <div className="duration">
          <ins>◷</ins>
          <p>11 days left</p>
        </div>
      </div>
      <hr />
      <div className='creator'>
        <div className='wrapper'>
          <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" alt="Creator" />
        </div>
        <p><ins>Creation of</ins> Kiberbash</p>
      </div>
    </div>
    </div> */}
      {content}
      <div className="ton-connect-page__button-container">
        <TonConnectButton />
      </div>
    </Page>
  );
};
