import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';
import { saveAs } from 'file-saver';
import { Parser } from '@json2csv/plainjs';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useActorStore from '../store/actorStore';
import useRelationStore from '../store/relationStore';
import useActorDragStore from '../store/actorDragStore';  // Para obtener las instancias de los actores

const ExportButton = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  
  // Estado para cargar datos de sesión
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('sessionId');
  
  // Traer actores, relaciones e instancias desde Zustand
  const { actors, fetchActors } = useActorStore();
  const { relations, loadRelations } = useRelationStore();
  const { actorsInstances } = useActorDragStore();  // Instancias de actores

  // Cargar actores y relaciones al montar el componente
  useEffect(() => {
    if (!sessionId) return;
    fetchActors(sessionId);
    loadRelations(sessionId);
  }, [sessionId, fetchActors, loadRelations]);

  const exportCSVFiles = async () => {
    if (actors.length === 0 || relations.length === 0 || !actorsInstances) return;

    // 1. Crear la tabla temporal de actores
    const actorTable = actors.map((actor, index) => ({
      _id: actor._id,        // ID original del actor
      id_archivo: index + 1, // ID generado para el archivo CSV (indexado desde 1)
      Label: actor.name      // Nombre del actor
    }));

    // 2. Exportar actores/nodos
    const exportActorsCSV = () => {
      // Obtener todas las claves de los atributos presentes en los actores
      const attributeKeys = Array.from(
        new Set(
          actors.flatMap(actor =>
            actor.attributes.map(attr => attr.key) // Extraer las claves de los atributos
          )
        )
      );

      // Formatear los actores para incluir los atributos como columnas
      const data = actors.map((actor, index) => {
        const base = {
          ID: index + 1, // ID generado para el CSV
          Label: actor.name,
          Color: actor.color,
          Icon: actor.icon,
        };

        // Añadir los atributos dinámicamente como columnas
        actor.attributes.forEach(attr => {
          base[attr.key] = attr.value; // Colocar el valor del atributo en la columna correcta
        });

        // Rellenar las columnas faltantes con valores vacíos si no tienen ese atributo
        attributeKeys.forEach(key => {
          if (!base[key]) {
            base[key] = ''; // Dejar vacío si el actor no tiene ese atributo
          }
        });

        return base;
      });

      // Definir los campos del CSV
      const fields = ['ID', 'Label', 'Color', 'Icon', ...attributeKeys];

      // Crear el convertidor
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);

      // Crear blob y descargar
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `nodes_${sessionId}.csv`);
    };

    // 3. Exportar relaciones/aristas
    const exportEdgesCSV = () => {
      // Crear un mapa de las instancias de actores para relacionarlas con sus actores originales
      const instanceToActorMap = Object.values(actorsInstances).reduce((map, instance) => {
        const actorInTable = actorTable.find(actor => actor._id === instance.actorId);
        if (actorInTable) {
          map[instance._id] = actorInTable.id_archivo;  // Relacionar la instancia con el ID generado
        }
        return map;
      }, {});

      // Formatear las relaciones para el CSV de aristas
      const data = relations.map((relation, index) => {
        return {
          'ID Source': instanceToActorMap[relation.source],  // Mapear el source ID con el ID generado
          'ID Target': instanceToActorMap[relation.target],  // Mapear el target ID con el ID generado
          'Tipo': relation.direction,                       // Tipo de relación (dirección)
          'Clase': relation.class,                          // Clase de la relación
          'ID Relación': index + 1,                         // Index de la relación
          'Weight': relation.weight,                        // Peso de la relación
          'Label': relation.type_label                      // Etiqueta del tipo de relación
        };
      });

      // Definir los campos del CSV
      const fields = ['ID Source', 'ID Target', 'Tipo', 'Clase', 'ID Relación', 'Weight', 'Label'];

      // Crear el CSV usando json2csv
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);

      // Descargar el archivo CSV
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `edges_${sessionId}.csv`);
    };

    // 4. Ejecutar las exportaciones de ambos CSVs
    await Promise.all([exportActorsCSV(), exportEdgesCSV()]);
  };

  return (
    <Button
      rightIcon={<AiOutlineLogout fontSize="1.5vw" />}
      w="8.5vw"
      h="2vw"
      bg="#272F34"
      color="white"
      variant="solid"
      fontSize="1.2vw"
      _hover={{ bg: '#9F9F9F', color: 'black' }}
      onClick={exportCSVFiles}
      isDisabled={actors.length === 0 || relations.length === 0 || !actorsInstances}
    >
      {t('exportButton')}
    </Button>
  );
};

export default ExportButton;
