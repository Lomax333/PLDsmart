<template>
    <tr class="row">
        <td>
            <input type="text" id="medicineAct" list="medicineActDatalist" @input="filterChars('medicineAct')" />
            <datalist id="medicineActDatalist">
            </datalist>
        </td>
        <td>
            <input id="posology" class="posology" type="text" name="" required @input="filterChars('posology')">
        </td>

        <td>
            <input id="treatmentPeriod" type="number" min="1" max="1000" name="" required
                onkeydown="return event.key !== ' ' && event.key !== '-' && event.key !== '+' && !['e', 'E'].includes(event.key);"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="3" style="width: 7vh; border-right: 2px solid #1817BA;"
                onchange="if (this.value < 1) {this.value = ''; alert('La valeur saisie dans le champs Durée du traitement n\'est pas valable');}">
            <select id="treatmentPeriodTexte" required style="width: 12vh; height: 2.7vh;">
                <option value="" disabled selected hidden></option>
                <option value="jours">jours</option>
                <option value="mois">mois</option>
            </select>
        </td>

        <td>
            <input id="renewal" type="number" min="0" max="2" name="" required
                onkeydown="return event.key !== ' ' && event.key !== '-' && event.key !== '+' && !['e', 'E'].includes(event.key);"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="2"
                onchange="if (this.value > 2 || this.value < 0) {this.value = ''; alert('La valeur saisie dans le champs Renouvellement n\'est pas valable');}">
        </td>

        <td>
            <input id="refundable" type="checkbox" name="">
        </td>

        <td>
            <textarea id="indication" rows="4" style="word-wrap: break-word;" name="" @input="filterChars('indication')"></textarea>
        </td>

        <td>
            <button class="buttonTable" type="button" @click="deleteMedicine">
                <img src="../assets/delete.png" alt="button delete prescription" />
            </button>
        </td>
    </tr>
</template>

<script>

export default {
    name: 'MedicamentComponent',
    props: ['index'],
    mounted() {
        this.loadData();
    },
    methods:
    {
        deleteMedicine() {
            this.$emit('delete', this.index);
        },
        loadData() {
            const data = require('../assets/medicine.json');
            const medicineSelect = document.getElementById("medicineActDatalist");
            let result = [];
            for (let i = 0; i < data.length; i++) {
                let concat = data[i].CODE_UCD.toString() + " " + data[i].NOM_COURT;
                result.push(concat);
                let option = document.createElement("option");
                option.value = data[i].NOM_COURT;
                option.text = concat;
                medicineSelect.appendChild(option);
            }
        },

        filterChars(identifier) {
            var valeurInput = document.getElementById(identifier).value;
            var valeurModifiee = valeurInput.replace(";", "");
            document.getElementById(identifier).value = valeurModifiee;

            valeurInput = document.getElementById(identifier).value;
            valeurModifiee = valeurInput.replace("\n", "");
            document.getElementById(identifier).value = valeurModifiee;
        }

    },


};



</script>

<style></style>