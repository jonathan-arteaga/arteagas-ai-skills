import {Button,CompactButton,LegacyButton,CheckoutButton} from './buttons';
export const pages = <><Button onClick={save}>Save project</Button><CompactButton onClick={openRow}>Open</CompactButton><LegacyButton onClick={save}>Save project</LegacyButton><CheckoutButton onClick={save}>Save project</CheckoutButton><Button onClick={deletePermanently}>Delete permanently</Button></>;
declare const save: () => void, openRow: () => void, deletePermanently: () => void;
