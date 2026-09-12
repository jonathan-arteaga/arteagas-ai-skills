export function Button({ children, onClick }) { return <button onClick={onClick} style={{background:"var(--action-bg)",color:"var(--action-fg)",padding:"var(--space-control)"}}>{children}</button>; }
export function CompactButton({ children, onClick }) { return <button onClick={onClick} style={{background:"var(--action-bg)",color:"var(--action-fg)",padding:"var(--space-control-compact)"}}>{children}</button>; }
/** @deprecated Use Button. */
export function LegacyButton({ children, onClick }) { return <button onClick={onClick}>{children}</button>; }
export function CheckoutButton({ children, onClick }) { return <button onClick={onClick} style={{background:"#183f75",color:"#fff",padding:9}}>{children}</button>; }
