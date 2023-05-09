import Web3 from "web3";

const medicalPrescriptionABI = require('../abis/MedicalPrescription.json');
const config = require('../config.json');
const web3 = new Web3(window.ethereum);

const medicalPrescriptionContract = new web3.eth.Contract(medicalPrescriptionABI, config.medicalPrescriptionContractAddress);

let account = null;

async function requestAccountAccess() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
        } catch (error) {
            console.log('User denied account access');
        }
    } else {
        console.log('Ethereum provider not found. Install MetaMask or use a different provider.');
    }
}

export async function addPrescription(prescriptionHash, daysValid) {
    if (account == null) {
        await requestAccountAccess();
    }
    if (account) {
        const nonce = await web3.eth.getTransactionCount(account, 'pending');
        const tx = await medicalPrescriptionContract.methods.addPrescription(prescriptionHash, daysValid).send({ from: account, nonce: nonce });
        return tx;
    }
    return null
}


export async function verifyPrescription(prescriptionHash) {
    if (account == null) {
        await requestAccountAccess();
    }
    if (account) {
        const nonce = await web3.eth.getTransactionCount(account, 'pending');
        const isValid = await medicalPrescriptionContract.methods.verifyPrescription(prescriptionHash).call({ from: account, nonce: nonce });
        return isValid;
    }
    return null;
}