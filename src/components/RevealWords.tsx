/** Splits a heading into words so the page entrance animation can reveal them one by one */
export function RevealWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className="page-title-word inline-block mr-[0.26em]">
          {w}
        </span>
      ))}
    </>
  );
}
