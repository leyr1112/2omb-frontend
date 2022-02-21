import React, { useEffect } from 'react';
import WalletCard from './WalletCard';
import { Modal, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import metamaskLogo from '../../assets/img/metamask-fox.svg';
import walletConnectLogo from '../../assets/img/wallet-connect.svg';
import coingBaseLogo from '../../assets/img/coinbase_logo.jpeg';
import coin98Logo from '../../assets/img/coin98.png';
import mathWalletLogo from '../../assets/img/mathWallet.png';
import { useWallet } from 'use-wallet';
const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '400px',
		maxWidth: '100%',
		// backgroundColor: theme.palette.background.paper,
		'background-color': '#cab4ff75',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(4),
		outline: 'none',
		borderRadius: 10,
		border: '1px solid #fff',
		backdropFilter: 'blur(15px)',
	},
}));

const WalletProviderModal = ({ open, handleClose }) => {
	const classes = useStyles();
	const wallet = useWallet();
	const { account, connect, ethereum } = useWallet();
	console.log(wallet, "&^^^^^^^^^^^^^^^^^^^^^^^")
	useEffect(() => {
		if (account) {
			handleClose();
		}
	});
	const getProvider = () => {
		if ("ethereum" in window) {
			const provider = ethereum;
			if (provider.isMathWallet) {
				return provider;
			}
		}
		window.open("https://mathwallet.org/", "_blank");
	};
	const walletConnect = async () => {
		const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		const account = accounts[0];
		console.log(account, "========================>web3")
		// console.log(account,"****************************")
		// if (web3) {
		//   if (!window.ethereum) {
		// 	return;
		//   }
		//   else {
		// 	const res = await window.ethereum.enable();        
		// 	// if (res.length) {
		// 	//   setOwnerAddress(res[0]);
		// 	// }
		//   }
		// }
	}
	return (
		<Modal
			aria-labelledby="connect a wallet"
			aria-describedby="connect your crypto wallet"
			open={open}
			style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			onClose={handleClose}
		>
			<div className={classes.paper}>
				<h2>Connect Wallet</h2>
				<List component="nav" aria-label="main mailbox folders">
					<WalletCard
						icon={<img src={metamaskLogo} alt="Metamask logo" style={{ height: 32 }} />}
						onConnect={() => {
							connect('injected');
						}}
						title="Metamask"
					/>
					<WalletCard
						icon={<img src={walletConnectLogo} alt="Wallet Connect logo" style={{ height: 24 }} />}
						onConnect={() => {
							connect('walletconnect');
						}}
						title="WalletConnect"
					/>
					<WalletCard
						icon={<img src={coingBaseLogo} alt="Coinbase wallet logo" style={{ height: 32 }} />}
						onConnect={() => {
							connect('walletlink');
						}}
						title="Coinbase Wallet"
					/>
					<WalletCard
						icon={<img src={coin98Logo} alt="Coin98 logo" style={{ height: 32, borderRadius: 8 }} />}
						onConnect={() => {
							connect('injected');
						}}
						title="Coin98 Wallet"
					/>
					<WalletCard
						icon={<img src={mathWalletLogo} alt="Math logo" style={{ height: 32, borderRadius: 8 }} />}
						onConnect={() => {
							connect('injected');
						}}
						title="Math Wallet"
					/>
				</List>
			</div>
		</Modal>
	);
};

export default WalletProviderModal;
