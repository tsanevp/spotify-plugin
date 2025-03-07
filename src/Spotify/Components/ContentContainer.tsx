import React from "react";

type ContentContainerProps = {
    header: React.ReactNode;
    content: React.ReactNode;
    footer?: React.ReactNode;
};

export default function ContentContainer({ header, content, footer }: Readonly<ContentContainerProps>) {
    return (
        <div className="flex flex-col flex-1 border rounded bg-[#121212]">
            {/* Header */}
            {header}

            {/* Content */}
            {content}

            {/* Footer (optional) */}
            {footer && (
                <div className="footer p-5 text-lg flex justify-end gap-x-4 flex-shrink-0">
                    {footer}
                </div>
            )}
        </div>
    );
}
