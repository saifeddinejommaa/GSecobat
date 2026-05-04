import { useEffect, useState } from "react";
import OrdersTable from "../../components/tables/OrdersTable";
import { useMachineReffilsStore } from "./state/MachineReffilsState";
import MachineReffilsFilters from "./MachineReffilsFilterWidget";
import { Modal } from "../../common/Widgets/Modal";
import type { Asset } from "../../machines/domain/models/Asset";
import { MachineAutocomplete } from "../../machines/ui/widgets/MachineAutocomplete";

export default function MachineReffilsPages() {
  const [open, setOpen] = useState(false);
  const { machinesReffils, fetchMachineReffils, loading } = useMachineReffilsStore();
  useEffect(() => {
    fetchMachineReffils();
  }, []);

  return (
    <div className="glass-card">
      <div className="card-header">
        <div>
          <div className="card-title">Machine Reffils</div>
          <div className="card-sub">Gestion des remplissages</div>
        </div>

        <button
          className="btn-primary"
          onClick={() => setOpen(true)}
        >
          + Ajouter
        </button>
      </div>
      <MachineReffilsFilters onApply={(filters: any) => {
        useMachineReffilsStore.setState({ filters });
        fetchMachineReffils();
      }} />
      <OrdersTable
        data={machinesReffils}
        columns={[
          {
            key: "reffilDate", label: "Date", render: (item) =>
              item.reffilDate
                ? new Date(item.reffilDate).toLocaleDateString("fr-FR")
                : "-",
          },
          { key: "assetSerialNumber", label: "Numéro Machine" },
          { key: "depotName", label: "Dépôt" },
          {
            key: "quantity",
            label: "Quantité",
            render: (item) => item.quantity ?? "-",
          },
          {
            key: "isFull",
            label: "Est Pleine",
            render: (item) => (item.isFull ? "Oui" : "Non"),
          },
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Ajouter un remplissage</h2>

        <div className="filters-grid" style={{ marginTop: 16 }}>
          <MachineAutocomplete onChange={(e: Asset) => console.log(e?.typeLabel)}></MachineAutocomplete>
          <input placeholder="Dépôt" />
          <input type="number" placeholder="Quantité" />

          <select>
            <option value="">Est pleine ?</option>
            <option value="1">Oui</option>
            <option value="0">Non</option>
          </select>
        </div>

        <button
          className="btn-primary"
          style={{ marginTop: 16 }}
          onClick={() => {
            // 👉 appel API ici
            setOpen(false);
          }}
        >
          Enregistrer
        </button>
      </Modal>
    </div>
  );
}