import { useState } from "react";
import { toast } from "react-toastify";
import { DateSelector } from "../../../common/Widgets/DateSelectorWidget";
import { useAddDepotReffil } from "../hooks/useAddNewDepotReffil";
import { Autocomplete } from "../../../common/Widgets/AutocompleteWidget";
import { useFuelDepotAutocomplete } from "../../../fuelDepots/ui/hooks/UseFuelDepotsAutoComplete";

const NewDepotReffilPage = () => {
  const { addDepotReffil, loading, error } = useAddDepotReffil();

  const [fuelDepotId, setFuelDepotId] = useState<number| undefined>(0);
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());
  const [quantity, setQuantity] = useState<number>(0);

  const handleAdd = async () => {
    if (
      !fuelDepotId ||
      quantity === 0
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const success = await addDepotReffil({
      fuelDepotId,
      date: purchaseDate?.toISOString() ?? null,
      quantity,
    });

    if (success) {
      toast.success("Opération réussite");
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

        {/* Type */}
        <div className="field">
          <label className="glass-label">Depot</label>
           <Autocomplete
                       useSearch={useFuelDepotAutocomplete}
                       getLabel={(m) => m.reference}
                       onSelect={(depot) => {
                         setFuelDepotId(depot.id)
                       }}
                       placeholder="Rechercher une machine..."
                       width={400}
                     />
        </div>

        {/* Date achat */}
        <div className="field">
          <label className="glass-label">Date d'achat</label>
          <DateSelector
            selectedDate={purchaseDate}
            onChange={(d) => setPurchaseDate(d?? new Date())}
          />
        </div>

        
        <div className="field">
          <label className="glass-label">Puissance fiscale</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="form-footer">
          <button
            disabled={loading}
            className="btn-primary"
            onClick={handleAdd}
          >
            {loading ? "Enregistrement..." : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDepotReffilPage;