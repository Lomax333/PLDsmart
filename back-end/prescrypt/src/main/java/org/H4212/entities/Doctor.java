package org.H4212.entities;


import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Doctor extends Person {

    @Column(name = "IdPSdoctor")
    @NotNull
    private Long idPSdoctor;

    @Column(name="Qualification")
    @NotNull
    private String qualification;

    @Column(name="Office Address")
    @NotNull
    private String officeAddress;

    @Column(name="Telephone Number")
    @NotNull
    private String telephone;

    public Doctor(String lastName, String firstName, String pseudo, String password, Long idPSdoctor, String qualification, String officeAddress, String telephone) {
        super(lastName, firstName, pseudo, password);
        this.idPSdoctor = idPSdoctor;
        this.qualification = qualification;
        this.officeAddress = officeAddress;
        this.telephone = telephone;
    }

    public Doctor() {

    }

    public Long getIdPSdoctor() {
        return idPSdoctor;
    }

    public void setIdPSdoctor(Long idPSdoctor) {
        this.idPSdoctor = idPSdoctor;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getOfficeAddress() {
        return officeAddress;
    }

    public void setOfficeAddress(String officeAddress) {
        this.officeAddress = officeAddress;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "idPSdoctor=" + idPSdoctor +
                ", qualification='" + qualification + '\'' +
                ", officeAddress='" + officeAddress + '\'' +
                ", telephone='" + telephone + '\'' +
                "} " + super.toString();
    }
}