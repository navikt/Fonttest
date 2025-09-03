
import { Heading, BodyLong, Button, Alert, Switch, Select, Popover, Tag, Table } from "@navikt/ds-react";

import { useState, useRef } from "react";
import { MoonFillIcon, SunFillIcon } from "@navikt/aksel-icons";

import { Accordion } from "@navikt/ds-react";

type AppProps = {
	dark: boolean;
	setDark: (v: boolean) => void;
};

const fontAxes = {
	"Source Sans 3": [
	   { name: "Weight", values: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] },
	   { name: "Italic", values: ["0", "1"] },
	   { name: "Størrelse", values: ["16", "18", "20"] },
   ],
   "Roboto Flex": [
	   { name: "Weight", values: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] },
	   { name: "Width", values: ["75", "80", "85", "90", "95", "100", "105", "110", "115", "120", "125"] },
	   { name: "Slant", values: ["0", "5", "10", "15", "20"] },
	   { name: "Optical Size", values: ["8", "10", "12", "14", "18", "24"] },
	   { name: "Størrelse", values: ["16", "18", "20"] },
   ],
   "Noto Sans": [
	   { name: "Weight", values: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] },
	   { name: "Italic", values: ["0", "1"] },
	   { name: "Størrelse", values: ["16", "18", "20"] },
   ],
   "Open Sans": [
	   { name: "Weight", values: ["300", "400", "500", "600", "700", "800"] },
	   { name: "Width", values: ["75", "85", "100", "115", "125"] },
	   { name: "Størrelse", values: ["16", "18", "20"] }
   ],
   "Inter": [
	   { name: "Weight", values: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] },
	   { name: "Italic", values: ["0", "1"] },
	   { name: "Størrelse", values: ["16", "18", "20"] },
	   { name: "Weight", values: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] },
	   { name: "Width", values: ["75", "80", "85", "90", "95", "100"] },
	   { name: "Italic", values: ["0", "1"] },
	   { name: "Størrelse", values: ["16", "18", "20"] },
   ],
};

const defaultFont = "Source Sans 3";

export default function App({ dark, setDark }: AppProps) {
	// Hjelpefunksjon for å mappe fontnavn til CSS font-family
	const getFontFamily = (font: string) => {
			switch (font) {
				case "Roboto Flex":
					return "'Roboto Flex', sans-serif";
				case "Open Sans":
					return "'Open Sans Variable', sans-serif";
				case "Source Sans 3":
					return "'Source Sans 3 Variable', sans-serif";
				case "Noto Sans":
					return "'Noto Sans Variable', sans-serif";
				case "Inter":
					return "'Inter', sans-serif";
				default:
					return "inherit";
			}
	};
	// Dynamisk tekst for Accordion basert på fontvalg
	const accordionTexts: Record<string, string[]> = {
		   "Source Sans 3": [
			   "Source Sans 3: Innhold for rad 1.",
			   "Source Sans 3: Innhold for rad 2.",
			   "Source Sans 3: Innhold for rad 3."
		   ],
		   "Roboto Flex": [
			   "Roboto Flex: Innhold for rad 1.",
			   "Roboto Flex: Innhold for rad 2.",
			   "Roboto Flex: Innhold for rad 3."
		   ],
		   "Noto Sans": [
			   "Noto Sans: Innhold for rad 1.",
			   "Noto Sans: Innhold for rad 2.",
			   "Noto Sans: Innhold for rad 3."
		   ],
		   "Open Sans": [
			   "Open Sans: Innhold for rad 1.",
			   "Open Sans: Innhold for rad 2.",
			   "Open Sans: Innhold for rad 3."
		   ],
		   "Inter": [
			   "Inter: Innhold for rad 1.",
			   "Inter: Innhold for rad 2.",
			   "Inter: Innhold for rad 3."
		   ]
	};
	const [fontCol1, setFontCol1] = useState(defaultFont);
	const [fontCol2, setFontCol2] = useState(defaultFont);
	// Debug: logg fontCol1 og fontCol2 for å se om de faktisk endres
	console.log("Valgt fontCol1:", fontCol1, "fontCol2:", fontCol2);
		const [axesCol1, setAxesCol1] = useState(fontAxes[defaultFont]);
		const [axesCol2, setAxesCol2] = useState(fontAxes[defaultFont]);
		const [axisValuesCol1, setAxisValuesCol1] = useState(axesCol1.map(a => a.values[0]));
		const [axisValuesCol2, setAxisValuesCol2] = useState(axesCol2.map(a => a.values[0]));
	const [popoverOpenCol1, setPopoverOpenCol1] = useState(false);
	const [popoverOpenCol2, setPopoverOpenCol2] = useState(false);
	const [displayFontCol1, setDisplayFontCol1] = useState(false);
	const [displayFontCol2, setDisplayFontCol2] = useState(false);
		const popoverAnchorCol1 = useRef<HTMLButtonElement | null>(null);
		const popoverAnchorCol2 = useRef<HTMLButtonElement | null>(null);

	// Oppdater aksene og verdier når font endres
	const handleFontCol1 = (val: string) => {
		setFontCol1(val);
		const axes = fontAxes[val as keyof typeof fontAxes];
		setAxesCol1(axes);
		setAxisValuesCol1(axes.map((a: { name: string; values: string[] }) => a.values[0]));
	};
	const handleFontCol2 = (val: string) => {
		setFontCol2(val);
		const axes = fontAxes[val as keyof typeof fontAxes];
		setAxesCol2(axes);
		setAxisValuesCol2(axes.map((a: { name: string; values: string[] }) => a.values[0]));
	};

	// Hjelpefunksjon for å finne weight og italic fra aksene
			function getWeight(axisValues: string[], axes: { name: string }[]) {
				const idx = axes.findIndex(a => a.name === "Weight");
				if (idx === -1) return 400;
				const val = axisValues[idx];
				const num = Number(val);
				return isNaN(num) ? 400 : num;
			}
			function getItalic(axisValues: string[], axes: { name: string }[]) {
				const idx = axes.findIndex(a => a.name === "Italic");
				if (idx === -1) return "normal";
				return axisValues[idx] === "1" ? "italic" : "normal";
			}
		       function getStretch(axisValues: string[], axes: { name: string }[]) {
			       const idx = axes.findIndex(a => a.name === "Width");
			       if (idx === -1) return undefined;
			       const val = axisValues[idx];
			       if (val === "100") return "100%";
			       if (val === "85") return "85%";
			       if (val === "75") return "75%";
			       return undefined;
		       }

	return (
			<main style={{ maxWidth: 1100, margin: "0 auto", padding: 40, position: "relative" }}>
				{/* Switch øverst til høyre */}
				<div style={{ position: "absolute", top: 24, right: 24, zIndex: 10 }}>
					<Switch
						checked={dark}
						onChange={() => setDark(!dark)}
						size="small"
						aria-label={dark ? "Bytt til lys modus" : "Bytt til mørk modus"}
					>
						{dark ? <MoonFillIcon aria-label="Dark mode" /> : <SunFillIcon aria-label="Light mode" />}
					</Switch>
				</div>

				   <Heading level="1" size="large" spacing>
					   ✨ Utforskning av nye fonter for Aksel
				   </Heading>



				{/* To kolonner med heading og dummy tekst */}
						<div style={{ display: "flex", gap: 64, marginTop: 48, alignItems: "stretch" }}>
					  <div style={{ flex: 1.2, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 520, fontFamily: getFontFamily(fontCol1) }}>
										   {/* Kolonne 1-heading fjernet */}
										{/* Stor select for fontvalg */}
																		<Select
																			label="Velg font"
																			style={{ marginBottom: 8, maxWidth: 220 }}
																			value={fontCol1}
																			onChange={e => handleFontCol1(e.target.value)}
																		>
																			{Object.keys(fontAxes).map(f => (
																				<option key={f} value={f}>{f}</option>
																			))}
																		</Select>
																						<Button
																							ref={popoverAnchorCol1}
																							size="small"
																							variant="secondary"
																							style={{ marginBottom: 16, width: 110, minWidth: 0, padding: '0 12px' }}
																							onClick={() => setPopoverOpenCol1((v) => !v)}
																							aria-expanded={popoverOpenCol1}
																							aria-controls="popover-col1"
																						>
																							Paragraph
																						</Button>
																		<Switch
																			checked={displayFontCol1}
																			onChange={() => setDisplayFontCol1(v => !v)}
																			size="small"
																			style={{ marginBottom: 16, marginLeft: 12 }}
																		>
																			Bruk NAVDisplay på heading
																		</Switch>
																		<Popover
																			open={popoverOpenCol1}
																			onClose={() => setPopoverOpenCol1(false)}
																			anchorEl={popoverAnchorCol1.current}
																			id="popover-col1"
																			placement="bottom-start"
																			arrow={false}
																		>
																			<div style={{ padding: 16, minWidth: 180 }}>
																				{axesCol1.map((axis, i) => (
																					<Select
																						key={axis.name + "-col1-popover"}
																						size="small"
																						label={axis.name}
																						value={axisValuesCol1[i]}
																						onChange={e => {
																							const newVals = [...axisValuesCol1];
																							newVals[i] = e.target.value;
																							setAxisValuesCol1(newVals);
																						}}
																						style={{ marginBottom: 12 }}
																					>
																						{axis.values.map(val => (
																							<option key={val} value={val}>{val}</option>
																						))}
																					</Select>
																				))}
																			</div>
																		</Popover>

																																				<Heading
																																					level="3"
																																					size="small"
																																					spacing
																																					style={{ marginTop: 40, marginBottom: 32, fontFamily: displayFontCol1 ? 'NAVDisplay, sans-serif' : undefined, fontSize: 32 }}
																																				>
																																					Hvem kan få?
																																				</Heading>
																																																																														   <BodyLong
																																																																															   style={{
																																																																																   fontFamily:
																																																																																	   fontCol1 === "Roboto Flex"
																																																																																		   ? "'Roboto Flex', sans-serif"
																																																																																		   : fontCol1 === "Open Sans"
																																																																																		   ? "'Open Sans Variable', sans-serif"
																																																																																		   : fontCol1 === "Source Sans 3"
																																																																																		   ? "'Source Sans 3 Variable', sans-serif"
																																																																																		   : fontCol1 === "Noto Sans"
																																																																																		   ? "'Noto Sans Variable', sans-serif"
																																																																																		   : undefined,
																																																																																   fontVariationSettings: [
																																																																																	   (() => {
																																																																																		   const idx = axesCol1.findIndex(a => a.name === "Weight");
																																																																																		   return idx !== -1 ? `'wght' ${axisValuesCol1[idx]}` : null;
																																																																																	   })(),
																																																																																	   (() => {
																																																																																		   const idx = axesCol1.findIndex(a => a.name === "Width");
																																																																																		   return idx !== -1 ? `'wdth' ${axisValuesCol1[idx]}` : null;
																																																																																	   })()
																																																																																   ]
																																																																																	   .filter(Boolean)
																																																																																	   .join(", "),
																																																																																   fontStyle: getItalic(axisValuesCol1, axesCol1),
																																																																																   fontSize: (() => {
																																																																																	   const idx = axesCol1.findIndex(a => a.name === "Størrelse");
																																																																																	   return idx !== -1 ? Number(axisValuesCol1[idx]) : 18;
																																																																																   })(),
																																																																																   marginBottom: 'var(--a-spacing-8)'
																																																																															   }}
																																																																														   >
																																						   Det er NAV som avgjør om sykmeldingen gir deg rett til sykepenger. Det er ulike regler avhengig av hva slags arbeid du har eller hvilken situasjon du er i.

																																						   Får du fosterhjemsgodtgjørelse? Da regnes du som frilanser. Det samme gjelder hvis du får omsorgsstønad og du ikke er ansatt hos en arbeidsgiver. Se egen informasjon for frilansere.

																																						   Se hvilke regler som gjelder for deg:
																																				   </BodyLong>
																																				   <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 'auto' }}>
																																					   <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
																																						<Button
																																							style={{
																																								fontFamily:
																																									fontCol1 === "Roboto Flex"
																																										? "'Roboto Flex', sans-serif"
																																										: fontCol1 === "Open Sans"
																																										? "'Open Sans Variable', sans-serif"
																																										: fontCol1 === "Source Sans 3"
																																										? "'Source Sans 3 Variable', sans-serif"
																																										: fontCol1 === "Noto Sans"
																																										? "'Noto Sans Variable', sans-serif"
																																										: undefined
																																							}}
																																						>Button</Button>
																																						<Button
																																							size="small"
																																							style={{
																																								fontFamily:
																																									fontCol1 === "Roboto Flex"
																																										? "'Roboto Flex', sans-serif"
																																										: fontCol1 === "Open Sans"
																																										? "'Open Sans Variable', sans-serif"
																																										: fontCol1 === "Source Sans 3"
																																										? "'Source Sans 3 Variable', sans-serif"
																																										: fontCol1 === "Noto Sans"
																																										? "'Noto Sans Variable', sans-serif"
																																										: undefined
																																							}}
																																						>Button small</Button>
																																						<Button
																																							size="xsmall"
																																							style={{
																																								fontFamily:
																																									fontCol1 === "Roboto Flex"
																																										? "'Roboto Flex', sans-serif"
																																										: fontCol1 === "Open Sans"
																																										? "'Open Sans Variable', sans-serif"
																																										: fontCol1 === "Source Sans 3"
																																										? "'Source Sans 3 Variable', sans-serif"
																																										: fontCol1 === "Noto Sans"
																																										? "'Noto Sans Variable', sans-serif"
																																										: undefined
																																							}}
																																						>Button xsmall</Button>
																																					   </div>
																																																																															 <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
																																																																																		<Tag
																																																																																				variant="error"
																																																																																				size="small"
																																																																																				style={{
																																																																																						fontFamily:
																																																																																								fontCol1 === "Roboto Flex"
																																																																																										? "'Roboto Flex', sans-serif"
																																																																																										: fontCol1 === "Open Sans"
																																																																																										? "'Open Sans Variable', sans-serif"
																																																																																										: fontCol1 === "Source Sans 3"
																																																																																										? "'Source Sans 3 Variable', sans-serif"
																																																																																										: fontCol1 === "Noto Sans"
																																																																																										? "'Noto Sans Variable', sans-serif"
																																																																																										: undefined
																																																																																				}}
																																																																																		>Error</Tag>
																																																																																		<Tag
																																																																																				variant="warning"
																																																																																				size="small"
																																																																																				style={{
																																																																																						fontFamily:
																																																																																								fontCol1 === "Roboto Flex"
																																																																																										? "'Roboto Flex', sans-serif"
																																																																																										: fontCol1 === "Open Sans"
																																																																																										? "'Open Sans Variable', sans-serif"
																																																																																										: fontCol1 === "Source Sans 3"
																																																																																										? "'Source Sans 3 Variable', sans-serif"
																																																																																										: fontCol1 === "Noto Sans"
																																																																																										? "'Noto Sans Variable', sans-serif"
																																																																																										: undefined
																																																																																				}}
																																																																																		>Warning</Tag>
																																																																																		<Tag
																																																																																				variant="success"
																																																																																				size="small"
																																																																																				style={{
																																																																																						fontFamily:
																																																																																								fontCol1 === "Roboto Flex"
																																																																																										? "'Roboto Flex', sans-serif"
																																																																																										: fontCol1 === "Open Sans"
																																																																																										? "'Open Sans Variable', sans-serif"
																																																																																										: fontCol1 === "Source Sans 3"
																																																																																										? "'Source Sans 3 Variable', sans-serif"
																																																																																										: fontCol1 === "Noto Sans"
																																																																																										? "'Noto Sans Variable', sans-serif"
																																																																																										: undefined
																																																																																				}}
																																																																																		>Success</Tag>
																																																																															 </div>
																																																																																																				   {/* Accordion fjernet */}
																																																																																			<div style={{ marginTop: 20, marginBottom: 8, fontSize: 14, color: '#888' }}>
																																																																																				Valgt font i kolonne 1: <b>{fontCol1}</b>
																																																																																			</div>
																																																																																			<Accordion style={{ marginTop: 0 }}>
																																																																																		<Accordion.Item>
																																																																																			<Accordion.Header>Accordion rad 1</Accordion.Header>
																																																																																			<Accordion.Content>
																																																																																				{(accordionTexts[fontCol1]?.[0]) || `Ingen innhold for valgt font: ${fontCol1}`}
																																																																																			</Accordion.Content>
																																																																																		</Accordion.Item>
																																																																																		<Accordion.Item>
																																																																																			<Accordion.Header>Accordion rad 2</Accordion.Header>
																																																																																			<Accordion.Content>
																																																																																				{(accordionTexts[fontCol1]?.[1]) || `Ingen innhold for valgt font: ${fontCol1}`}
																																																																																			</Accordion.Content>
																																																																																		</Accordion.Item>
																																																																																		<Accordion.Item>
																																																																																			<Accordion.Header>Accordion rad 3</Accordion.Header>
																																																																																			<Accordion.Content>
																																																																																				{(accordionTexts[fontCol1]?.[2]) || `Ingen innhold for valgt font: ${fontCol1}`}
																																																																																			</Accordion.Content>
																																																																																		</Accordion.Item>
																																																																																	</Accordion>
																																																																																																																									 <Alert variant="success" style={{ marginTop: 'var(--a-spacing-8)' }}>
																																																																																																																										 Dette er en suksessmelding for kolonne 1.
																																																																																																																									 </Alert>
																																																																																																																									<Table size="small" style={{ marginTop: 'var(--a-spacing-8)', maxWidth: 420 }}>
																																																																																																																										 <Table.Header>
																																																																																																																											 <Table.Row>
																																																																																																																												 <Table.HeaderCell>Navn</Table.HeaderCell>
																																																																																																																												 <Table.HeaderCell>Verdi</Table.HeaderCell>
																																																																																																																											 </Table.Row>
																																																																																																																										 </Table.Header>
																																																																																																																										 <Table.Body>
																																																																																																																											 <Table.Row>
																																																																																																																												 <Table.DataCell>Rad 1</Table.DataCell>
																																																																																																																												 <Table.DataCell>Innhold 1</Table.DataCell>
																																																																																																																											 </Table.Row>
																																																																																																																											 <Table.Row>
																																																																																																																												 <Table.DataCell>Rad 2</Table.DataCell>
																																																																																																																												 <Table.DataCell>Innhold 2</Table.DataCell>
																																																																																																																											 </Table.Row>
																																																																																																																											 <Table.Row>
																																																																																																																												 <Table.DataCell>Rad 3</Table.DataCell>
																																																																																																																												 <Table.DataCell>Innhold 3</Table.DataCell>
																																																																																																																											 </Table.Row>
																																																																																																																										 </Table.Body>
																																																																																																																									   </Table>
																																																																																																																									   <div style={{ marginTop: 'var(--a-spacing-32)' }} />
																																																																																																																																														{/* Fjernet DatePicker som ga feil */}
																																																																														 </div>
					</div>
					  <div style={{ flex: 1.2, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 520, fontFamily: getFontFamily(fontCol2) }}>
										   {/* Kolonne 2-heading fjernet */}
										{/* Stor select for fontvalg */}
																		<Select
																			label="Velg font"
																			style={{ marginBottom: 8, maxWidth: 220 }}
																			value={fontCol2}
																			onChange={e => handleFontCol2(e.target.value)}
																		>
																			{Object.keys(fontAxes).map(f => (
																				<option key={f} value={f}>{f}</option>
																			))}
																		</Select>
																						<Button
																							ref={popoverAnchorCol2}
																							size="small"
																							variant="secondary"
																							style={{ marginBottom: 16, width: 110, minWidth: 0, padding: '0 12px' }}
																							onClick={() => setPopoverOpenCol2((v) => !v)}
																							aria-expanded={popoverOpenCol2}
																							aria-controls="popover-col2"
																						>
																							Paragraph
																						</Button>
																		<Switch
																			checked={displayFontCol2}
																			onChange={() => setDisplayFontCol2(v => !v)}
																			size="small"
																			style={{ marginBottom: 16, marginLeft: 12 }}
																		>
																			Bruk NAVDisplay på heading
																		</Switch>
																		<Popover
																			open={popoverOpenCol2}
																			onClose={() => setPopoverOpenCol2(false)}
																			anchorEl={popoverAnchorCol2.current}
																			id="popover-col2"
																			placement="bottom-start"
																			arrow={false}
																		>
																			<div style={{ padding: 16, minWidth: 180 }}>
																				{axesCol2.map((axis, i) => (
																					<Select
																						key={axis.name + "-col2-popover"}
																						size="small"
																						label={axis.name}
																						value={axisValuesCol2[i]}
																						onChange={e => {
																							const newVals = [...axisValuesCol2];
																							newVals[i] = e.target.value;
																							setAxisValuesCol2(newVals);
																						}}
																						style={{ marginBottom: 12 }}
																					>
																						{axis.values.map(val => (
																							<option key={val} value={val}>{val}</option>
																						))}
																					</Select>
																				))}
																			</div>
																		</Popover>

																																				<Heading
																																					level="3"
																																					size="small"
																																					spacing
																																					style={{ marginTop: 40, marginBottom: 32, fontFamily: displayFontCol2 ? 'NAVDisplay, sans-serif' : undefined, fontSize: 32 }}
																																				>
																																					Hvem kan få?
																																				</Heading>
																																																																														   <BodyLong
																																																																															   style={{
																																																																																   fontFamily:
																																																																																	   fontCol2 === "Roboto Flex"
																																																																																		   ? "'Roboto Flex', sans-serif"
																																																																																		   : fontCol2 === "Open Sans"
																																																																																		   ? "'Open Sans Variable', sans-serif"
																																																																																		   : fontCol2 === "Source Sans 3"
																																																																																		   ? "'Source Sans 3 Variable', sans-serif"
																																																																																		   : fontCol2 === "Noto Sans"
																																																																																		   ? "'Noto Sans Variable', sans-serif"
																																																																																		   : undefined,
																																																																																   fontVariationSettings: [
																																																																																	   (() => {
																																																																																		   const idx = axesCol2.findIndex(a => a.name === "Weight");
																																																																																		   return idx !== -1 ? `'wght' ${axisValuesCol2[idx]}` : null;
																																																																																	   })(),
																																																																																	   (() => {
																																																																																		   const idx = axesCol2.findIndex(a => a.name === "Width");
																																																																																		   return idx !== -1 ? `'wdth' ${axisValuesCol2[idx]}` : null;
																																																																																	   })()
																																																																																   ]
																																																																																	   .filter(Boolean)
																																																																																	   .join(", "),
																																																																																   fontStyle: getItalic(axisValuesCol2, axesCol2),
																																																																																   fontSize: (() => {
																																																																																	   const idx = axesCol2.findIndex(a => a.name === "Størrelse");
																																																																																	   return idx !== -1 ? Number(axisValuesCol2[idx]) : 18;
																																																																																   })(),
																																																																																   marginBottom: 'var(--a-spacing-8)'
																																																																															   }}
																																																																														   >
																																						   Det er NAV som avgjør om sykmeldingen gir deg rett til sykepenger. Det er ulike regler avhengig av hva slags arbeid du har eller hvilken situasjon du er i.

																																						   Får du fosterhjemsgodtgjørelse? Da regnes du som frilanser. Det samme gjelder hvis du får omsorgsstønad og du ikke er ansatt hos en arbeidsgiver. Se egen informasjon for frilansere.

																																						   Se hvilke regler som gjelder for deg:
																																				   </BodyLong>
																																				   <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 'auto' }}>
																																					   <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
																																						<Button
																																							style={{
																																								fontFamily:
																																									fontCol2 === "Roboto Flex"
																																										? "'Roboto Flex', sans-serif"
																																										: fontCol2 === "Open Sans"
																																										? "'Open Sans Variable', sans-serif"
																																										: fontCol2 === "Source Sans 3"
																																										? "'Source Sans 3 Variable', sans-serif"
																																										: fontCol2 === "Noto Sans"
																																										? "'Noto Sans Variable', sans-serif"
																																										: undefined
																																							}}
																																						>Button</Button>
																																						<Button
																																							size="small"
																																							style={{
																																								fontFamily:
																																									fontCol2 === "Roboto Flex"
																																										? "'Roboto Flex', sans-serif"
																																										: fontCol2 === "Open Sans"
																																										? "'Open Sans Variable', sans-serif"
																																										: fontCol2 === "Source Sans 3"
																																										? "'Source Sans 3 Variable', sans-serif"
																																										: fontCol2 === "Noto Sans"
																																										? "'Noto Sans Variable', sans-serif"
																																										: undefined
																																							}}
																																						>Button small</Button>
																																						<Button
																																							size="xsmall"
																																							style={{
																																								fontFamily:
																																									fontCol2 === "Roboto Flex"
																																										? "'Roboto Flex', sans-serif"
																																										: fontCol2 === "Open Sans"
																																										? "'Open Sans Variable', sans-serif"
																																										: fontCol2 === "Source Sans 3"
																																										? "'Source Sans 3 Variable', sans-serif"
																																										: fontCol2 === "Noto Sans"
																																										? "'Noto Sans Variable', sans-serif"
																																										: undefined
																																							}}
																																						>Button xsmall</Button>
																																					   </div>
																																																																															 <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
																																																																																		<Tag
																																																																																				variant="error"
																																																																																				size="small"
																																																																																				style={{
																																																																																						fontFamily:
																																																																																								fontCol2 === "Roboto Flex"
																																																																																										? "'Roboto Flex', sans-serif"
																																																																																										: fontCol2 === "Open Sans"
																																																																																										? "'Open Sans Variable', sans-serif"
																																																																																										: fontCol2 === "Source Sans 3"
																																																																																										? "'Source Sans 3 Variable', sans-serif"
																																																																																										: fontCol2 === "Noto Sans"
																																																																																										? "'Noto Sans Variable', sans-serif"
																																																																																										: undefined
																																																																																				}}
																																																																																		>Error</Tag>
																																																																																		<Tag
																																																																																				variant="warning"
																																																																																				size="small"
																																																																																				style={{
																																																																																						fontFamily:
																																																																																								fontCol2 === "Roboto Flex"
																																																																																										? "'Roboto Flex', sans-serif"
																																																																																										: fontCol2 === "Open Sans"
																																																																																										? "'Open Sans Variable', sans-serif"
																																																																																										: fontCol2 === "Source Sans 3"
																																																																																										? "'Source Sans 3 Variable', sans-serif"
																																																																																										: fontCol2 === "Noto Sans"
																																																																																										? "'Noto Sans Variable', sans-serif"
																																																																																										: undefined
																																																																																				}}
																																																																																		>Warning</Tag>
																																																																																		<Tag
																																																																																				variant="success"
																																																																																				size="small"
																																																																																				style={{
																																																																																						fontFamily:
																																																																																								fontCol2 === "Roboto Flex"
																																																																																										? "'Roboto Flex', sans-serif"
																																																																																										: fontCol2 === "Open Sans"
																																																																																										? "'Open Sans Variable', sans-serif"
																																																																																										: fontCol2 === "Source Sans 3"
																																																																																										? "'Source Sans 3 Variable', sans-serif"
																																																																																										: fontCol2 === "Noto Sans"
																																																																																										? "'Noto Sans Variable', sans-serif"
																																																																																										: undefined
																																																																																				}}
																																																																																		>Success</Tag>
																																																																															 </div>
																																																																																																				   {/* Accordion fjernet */}
																																																																																			<div style={{ marginTop: 20, marginBottom: 8, fontSize: 14, color: '#888' }}>
																																																																																				Valgt font i kolonne 2: <b>{fontCol2}</b>
																																																																																			</div>
																																																																																			<Accordion style={{ marginTop: 0 }}>
																																																																																		<Accordion.Item>
																																																																																			<Accordion.Header>Accordion rad 1</Accordion.Header>
																																																																																			<Accordion.Content>
																																																																																				{(accordionTexts[fontCol2]?.[0]) || `Ingen innhold for valgt font: ${fontCol2}`}
																																																																																			</Accordion.Content>
																																																																																		</Accordion.Item>
																																																																																		<Accordion.Item>
																																																																																			<Accordion.Header>Accordion rad 2</Accordion.Header>
																																																																																			<Accordion.Content>
																																																																																				{(accordionTexts[fontCol2]?.[1]) || `Ingen innhold for valgt font: ${fontCol2}`}
																																																																																			</Accordion.Content>
																																																																																		</Accordion.Item>
																																																																																		<Accordion.Item>
																																																																																			<Accordion.Header>Accordion rad 3</Accordion.Header>
																																																																																			<Accordion.Content>
																																																																																				{(accordionTexts[fontCol2]?.[2]) || `Ingen innhold for valgt font: ${fontCol2}`}
																																																																																			</Accordion.Content>
																																																																																		</Accordion.Item>
																																																																																	</Accordion>
																																																																																																																									 <Alert variant="success" style={{ marginTop: 'var(--a-spacing-8)' }}>
																																																																																																																										 Dette er en suksessmelding for kolonne 2.
																																																																																																																									 </Alert>
																																																																																																																									<Table size="small" style={{ marginTop: 'var(--a-spacing-8)', maxWidth: 420 }}>
																																																																																																																										 <Table.Header>
																																																																																																																											 <Table.Row>
																																																																																																																												 <Table.HeaderCell>Navn</Table.HeaderCell>
																																																																																																																												 <Table.HeaderCell>Verdi</Table.HeaderCell>
																																																																																																																											 </Table.Row>
																																																																																																																										 </Table.Header>
																																																																																																																										 <Table.Body>
																																																																																																																											 <Table.Row>
																																																																																																																												 <Table.DataCell>Rad 1</Table.DataCell>
																																																																																																																												 <Table.DataCell>Innhold 1</Table.DataCell>
																																																																																																																											 </Table.Row>
																																																																																																																											 <Table.Row>
																																																																																																																												 <Table.DataCell>Rad 2</Table.DataCell>
																																																																																																																												 <Table.DataCell>Innhold 2</Table.DataCell>
																																																																																																																											 </Table.Row>
																																																																																																																											 <Table.Row>
																																																																																																																												 <Table.DataCell>Rad 3</Table.DataCell>
																																																																																																																												 <Table.DataCell>Innhold 3</Table.DataCell>
																																																																																																																											 </Table.Row>
																																																																																																																										 </Table.Body>
																																																																																																																									   </Table>
																																																																																																																									   <div style={{ marginTop: 'var(--a-spacing-32)' }} />
																																																																																																																																														{/* Fjernet DatePicker som ga feil */}
																																																																														 </div>
					</div>
				</div>
			</main>
		);
}


