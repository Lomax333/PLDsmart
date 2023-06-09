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

function extractRevertReason(error) {
    console.log(error.message);
    const revertKeyword = "revert ";
    const startIndex = error.message.indexOf(revertKeyword) + revertKeyword.length;
    const endIndex = error.message.indexOf("\"", startIndex);
    return error.message.slice(startIndex, endIndex);
}

export async function addPrescription(prescriptionHash, daysValid) {
    if (account == null) {
        await requestAccountAccess();
    }
    if (account) {
        try {
            await medicalPrescriptionContract.methods
                .addPrescription(prescriptionHash, daysValid)
                .estimateGas({ from: account });

            const tx = await medicalPrescriptionContract.methods
                .addPrescription(prescriptionHash, daysValid)
                .send({ from: account });
            return { success: true, tx };
        } catch (error) {
            console.log('Error in addPrescription:', error);
            const reason = extractRevertReason(error);
            return { success: false, message: reason };
        }
    }
    return { success: false, message: 'Compte metamask non connecté' };
}

export async function deliverPrescription(prescriptionHash) {
    if (account == null) {
        await requestAccountAccess();
    }
    if (account) {
        try {
            await medicalPrescriptionContract.methods
                .deliverPrescription(prescriptionHash)
                .estimateGas({ from: account });

            const tx = await medicalPrescriptionContract.methods
                .deliverPrescription(prescriptionHash)
                .send({ from: account });
            return { success: true, tx };
        } catch (error) {
            console.log('Error in deliverPrescription:', error);
            const reason = extractRevertReason(error);
            return { success: false, message: reason };
        }
    }
    return { success: false, message: 'Compte metamask non connecté' };
}

export async function addDoctor(doctorAddress) {
    if (account == null) {
        await requestAccountAccess();
    }
    if (account) {
        try {
            await medicalPrescriptionContract.methods
                .grantDoctorRole(doctorAddress)
                .estimateGas({ from: account });

            const tx = await medicalPrescriptionContract.methods
                .grantDoctorRole(doctorAddress)
                .send({ from: account });
            return { success: true, tx };
        } catch (error) {
            console.log('Error in grantDoctorRole:', error);
            const reason = extractRevertReason(error);
            return { success: false, message: reason };
        }
    }
    return { success: false, message: 'Compte metamask non connecté' };
}

export async function addPharmacist(pharmacistAddress) {
    if (account == null) {
        await requestAccountAccess();
    }
    if (account) {
        try {
            await medicalPrescriptionContract.methods
                .grantPharmacistRole(pharmacistAddress)
                .estimateGas({ from: account });

            const tx = await medicalPrescriptionContract.methods
                .grantPharmacistRole(pharmacistAddress)
                .send({ from: account });
            return { success: true, tx };
        } catch (error) {
            console.log('Error in grantPharmacistRole:', error);
            const reason = extractRevertReason(error);
            return { success: false, message: reason };
        }
    }
    return { success: false, message: 'Compte metamask non connecté' };
}

export async function deleteDoctor(doctorAddress) {
    if (account == null) {
        await requestAccountAccess();
    }
    if (account) {
        try {
            await medicalPrescriptionContract.methods
                .revokeDoctorRole(doctorAddress)
                .estimateGas({ from: account });

            const tx = await medicalPrescriptionContract.methods
                .revokeDoctorRole(doctorAddress)
                .send({ from: account });
            return { success: true, tx };
        } catch (error) {
            console.log('Error in revokeDoctorRole:', error);
            const reason = extractRevertReason(error);
            return { success: false, message: reason };
        }
    }
    return { success: false, message: 'Compte metamask non connecté' };
}

export async function deletePharmacist(pharmacistAddress) {
    if (account == null) {
        await requestAccountAccess();
    }
    if (account) {
        try {
            await medicalPrescriptionContract.methods
                .revokePharmacistRole(pharmacistAddress)
                .estimateGas({ from: account });

            const tx = await medicalPrescriptionContract.methods
                .revokePharmacistRole(pharmacistAddress)
                .send({ from: account });
            return { success: true, tx };
        } catch (error) {
            console.log('Error in revokePharmacistRole:', error);
            const reason = extractRevertReason(error);
            return { success: false, message: reason };
        }
    }
    return { success: false, message: 'Compte metamask non connecté' };
}