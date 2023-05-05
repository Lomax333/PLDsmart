import Web3 from "web3";
const medicalPrescriptionABI = require('./MedicalPrescriptionABI.json');
const config = require('./config.json');


// Set up web3 provider
const web3 = new Web3(window.ethereum);

const medicalPrescriptionContract = new web3.eth.Contract(medicalPrescriptionABI, config.medicalPrescriptionContractAddress);

let account = null;

async function requestAccountAccess() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
        } catch (error) {
            alert('User denied account access');
        }
    } else {
        alert('Ethereum provider not found. Install MetaMask or use a different provider.');
    }
}

export async function addPrescription(prescriptionHash, daysValid) {
    if (account == null) {
        await requestAccountAccess();
    }
    if (account) {
        const tx = await medicalPrescriptionContract.methods.addPrescription(prescriptionHash, daysValid).send({ from: account });
        return tx;
    }
    return null;
}