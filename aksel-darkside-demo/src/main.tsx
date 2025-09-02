
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "@navikt/ds-css";
import "@navikt/ds-css/darkside";
import { Theme } from "@navikt/ds-react/Theme";
import App from "./App";

function Main() {
	const [dark, setDark] = useState(true);
	return (
		<React.StrictMode>
			<Theme theme={dark ? "dark" : "light"} hasBackground>
				<App dark={dark} setDark={setDark} />
			</Theme>
		</React.StrictMode>
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
