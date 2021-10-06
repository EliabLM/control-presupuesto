import React, { useEffect, useState } from 'react';

import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {
	// Definir el state
	const [presupuesto, guardarPresupuesto] = useState(0);
	const [restante, guardarRestante] = useState(0);
	const [mostrarpregunta, actualizarPregunta] = useState(true);
	const [gastos, guardarGastos] = useState([]);
	const [gasto, guardarGasto] = useState({});
	const [creargasto, guardarCrearGasto] = useState(false);

	// useEffect que actualiza el restante
	useEffect(() => {
		if (creargasto) {
			// Agrega el nuevo presupuesto
			guardarGastos([...gastos, gasto]);

			// Resta del presupuesto actual
			const presupuestoRestante = restante - gasto.cantidad;
			guardarRestante(presupuestoRestante);

			// Resetear a false
			guardarCrearGasto(false);
		}
	}, [gasto]);

	return (
		<div clasname="container">
			<header>
				<h1>Presupuesto</h1>
				<div className="contenido-principal contenido">
					{mostrarpregunta ? (
						<Pregunta
							guardarPresupuesto={guardarPresupuesto}
							guardarRestante={guardarRestante}
							actualizarPregunta={actualizarPregunta}
						/>
					) : (
						<div className="row">
							<div className="one-half column">
								<Formulario
									guardarCrearGasto={guardarCrearGasto}
									guardarGasto={guardarGasto}
								/>
							</div>
							<div className="one-half column">
								<Listado gastos={gastos} />
								<ControlPresupuesto
									presupuesto={presupuesto}
									restante={restante}
								/>
							</div>
						</div>
					)}
				</div>
			</header>
		</div>
	);
}

export default App;
