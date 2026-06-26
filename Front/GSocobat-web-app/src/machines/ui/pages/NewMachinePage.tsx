import { useState } from "react";
import { toast } from "react-toastify";
import { DateSelector } from "../../../common/Widgets/DateSelectorWidget";
import { useAddMachine } from "../hooks/useAddMachine";
import { AssetTypesSelect } from "../../../common/Widgets/ConstantSelects/AssetTypesSelect";

const NewMachinePage = () => {
  const { addMachine, loading, error } = useAddMachine();

  const [serialNumber, setSerialNumber] = useState("");
  const [assetTypeId, setAssetTypeId] = useState<number| undefined>(0);
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());
  const [fiscalHorsepower, setFiscalHorsepower] = useState<number>(0);
  const [mch, setMch] = useState("");
  const [currentFuelQuantity, setCurrentFuelQuantity] = useState<number>(0);

  const handleAdd = async () => {
    if (
      !serialNumber ||
      assetTypeId === 0 ||
      assetTypeId === undefined ||
      fiscalHorsepower <= 0
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const success = await addMachine({
      serialNumber,
      assetTypeId,
      purchaseDate: purchaseDate?.toISOString() ?? null,
      fiscalHorsepower,
      mch: mch || null,
      currentFuelQuantity,
    });

    if (success) {
      toast.success("Machine créée avec succès");
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="card-title">Nouvelle machine</div>
      </div>

      <div className="forms-column" style={{ marginTop: 16 }}>

        {/* Numéro de série */}
        <div className="field">
          <label className="glass-label">Numéro de série</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Numéro de série"
          />
        </div>

        {/* Type */}
        <div className="field">
          <label className="glass-label">Type</label>
           <AssetTypesSelect onChange={(e)=> setAssetTypeId(e)}></AssetTypesSelect>
        </div>

        {/* Date achat */}
        <div className="field">
          <label className="glass-label">Date d'achat</label>
          <DateSelector
            selectedDate={purchaseDate}
            onChange={(d) => setPurchaseDate(d?? new Date())}
          />
        </div>

        {/* Puissance fiscale */}
        <div className="field">
          <label className="glass-label">Puissance fiscale</label>
          <input
            type="number"
            value={fiscalHorsepower}
            onChange={(e) => setFiscalHorsepower(Number(e.target.value))}
          />
        </div>

        {/* MCH */}
        <div className="field">
          <label className="glass-label">MCH</label>
          <input
            type="text"
            value={mch}
            onChange={(e) => setMch(e.target.value)}
            placeholder="MCH"
          />
        </div>

        <div className="field">
          <label className="glass-label">Capacité carburant</label>
          <input
            type="number"
            value={currentFuelQuantity}
            onChange={(e) =>
              setCurrentFuelQuantity(Number(e.target.value))
            }
          />
        </div>

        <div className="form-footer">
          <button
            disabled={loading}
            className="btn-primary"
            onClick={handleAdd}
          >
            {loading ? "Enregistrement..." : "Créer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMachinePage;