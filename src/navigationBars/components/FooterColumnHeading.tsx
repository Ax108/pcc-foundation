type FooterColumnHeadingProps = {
  children: string;
  id?: string;
};

export const FooterColumnHeading = ({
  children,
  id,
}: FooterColumnHeadingProps) => (
  <h2 id={id} className="mb-4 text-lg font-semibold text-white">
    {children}
  </h2>
);
