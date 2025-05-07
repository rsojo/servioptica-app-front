import { GridAtom, RowAtom } from "../../atoms";
import "./style.css";
import { OrderData } from "../../../api/Orders/type";
import { GeneralStep } from "./step/generalStep";

export const SteperOrderTracking = ({
  currentStep,
  data,
}: {
  currentStep: number;
  data: OrderData[] | null;
}) => {
  const minSteps = 5;
  const filledData = [...(data || [])];
  while (filledData.length < minSteps) {
    const index = filledData.length + 1;
    filledData.push({
      id: index,
      document_no: '',
      seq_no: `${index}`,
      seq_no_original: '',
      fecha_entrada: '',
      pedido: '',
      pedido_cliente: '',
      lote_num_laboratorio: '',
      estado: '',
      fecha_estado: '',
      fecha_estimada: '',
      fecha_recalculo: '',
      fecha_modificacion: '',
      id_cliente_contacto: '',
      razon_social: '',
      nit: '',
      cliente_contacto: '',
      escenario: '',
    });
  }

  return (
    <GridAtom className="SteperOrderTracking_Box">
      <RowAtom
        className="SteperOrderTracking_Row"
        gap={4}
        alignItems="flex-start"
      >
        <GridAtom className="SteperOrderTracking_Bar">
          <GridAtom
            style={{
              width: currentStep <= 5 ? `${currentStep * (100 / 5)}%` : '100%',
              position: 'absolute',
              height: '100%',
              background: 'rgb(175 214 247)',
              borderRadius: 30,
            }}
          />
        </GridAtom>
        {filledData.map((item, index) => (
          <GeneralStep data={item} key={index} />
        ))}
      </RowAtom>
    </GridAtom>
  );
};
