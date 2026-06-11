
import Select from "react-select";
import { useState } from "react";
import { Autocomplete } from "../../../common/Widgets/AutocompleteWidget";
import { useFuelDepotAutocomplete } from "../../../fuelDepots/ui/hooks/UseFuelDepotsAutoComplete";
import { useMachineAutocomplete } from "../hooks/UseMachineAutoComplete";
import { customStyles } from "../../../common/customStyles/SelectCustomStyles";
import { DateSelector } from "../../../common/Widgets/DateSelectorWidget";



type Option = {
  value: boolean;
  label: string;
};

const NewMachinePage = () => {
  const options: Option[] = [{ label: "Oui", value: true }, { label: "Non", value: false }];

  //const { addMachine, loading, error } = useAddMachine();

  const [machineId, setMachineId] = useState<number>(0);
  const [fuelDepotId, setFuelDepotId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const handleAdd = async () => {
    if (machineId === 0 || fuelDepotId === 0 || quantity === 0) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    /*
    const success = await addMachineReffil({
      assetId: machineId,
      fuelDepotId: fuelDepotId,
      quantity: quantity,
      isFull: isFull,
      reffilDate: date,
    });
    

    if (success) {
      console.log("Added successfully");
    }
      */
  };

  return (
    <div className="modal-container">
      <div className="card-title">Charger une machine</div>

      <div className="forms-column" style={{ marginTop: 16 }}>

        {/* Machine */}
        <div className="field">
          <label className="glass-label">Machine</label>
          <Autocomplete
            useSearch={useMachineAutocomplete}
            getLabel={(m) => m.serialNumber}
            onSelect={(machine) => {
              setMachineId(machine.id)
            }}
            placeholder="Rechercher une machine..."
            width={400}
          />
        </div>

        {/* Dépôt */}
        <div className="field">
          <label className="glass-label">Dépôt</label>
          <Autocomplete
            useSearch={useFuelDepotAutocomplete}
            getLabel={(m) => m.reference}
            onSelect={(fuelDepot) => {
              setFuelDepotId(fuelDepot.id)
            }}
            placeholder="Rechercher un dépôt..."
            width={400}
          />
        </div>

        {/* Quantité */}
        <div className="field">
          <label className="glass-label">Quantité</label>
          <input type="number" placeholder="Quantité" onChange={(e) => setQuantity(Number(e.target.value))} />
        </div>

        {/* Est pleine */}
        <div className="field">
          <label className="glass-label">État de remplissage</label>
          <Select
            options={options}
            onChange={(selected) => {  setIsFull(selected?.value ?? false)} }
            placeholder="Est pleine ?"
            styles={customStyles}
            isClearable
          />

        </div>
        {/* Date */}
        <div className="field">
          <label className="glass-label">Date</label>
          <DateSelector selectedDate={new Date()}  onChange={(d) => setDate(d??new Date())}></DateSelector>
        </div>
     
         {/* Error 
        {error && (
          <div style={{ color: "red", marginTop: 10 }}>
            {error}
          </div>
          
        )}
*/}
        <div className="modal-footer">
          <button
            className="btn-primary"
            style={{ marginTop: 16 }}
            onClick={
             handleAdd
            }
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMachinePage;