import React from 'react'

interface CustomizationButtonProps {
    selectedFont: string;
    handleFontChange: (font: string) => void;
}
export const CustomizationButton = ({ selectedFont, handleFontChange }: CustomizationButtonProps) => {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
                {fonts.map((font, index) => (
                    <button
                        key={index}
                        className={`py-2 px-3 rounded-lg border ${selectedFont === font.font ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors' : 'bg-gray-300 text-gray-700'} font-medium`}
                        style={{ fontFamily: font.font }}
                        onClick={() => handleFontChange(font.font)}
                    >
                        {font.name}
                    </button>
                ))}
            </div>
        </>
    )
}

const fonts = [{
    'font': "Barbara-Calligraphy",
    'name': "Barbara",
}, {
    'font': "bellamona-webfont",
    'name': "Bellamona",
}, {
    'font': "Bellarina",
    'name': "Bellerina",
}, {
    'font': "brittanysignature-webfont",
    'name': "Brittany",
}, {
    'font': "Buttervill",
    'name': "Buttervill",
}, {
    'font': "combine-script",
    'name': "Combine",
}, {
    'font': "cosmodrome-monoline-webfont",
    'name': "Cosmodrome",
}, {
    'font': "DancingScript-VariableFont",
    'name': "Dancing",
}, {
    'font': "dream_angel-webfont",
    'name': "Dream Angel",
}, {
    'font': "foundry-font_pack-webfont",
    'name': "Foundry",
}, {
    'font': "funky_signature-webfont",
    'name': "Funky",
}, {
    'font': "HaloHandletter",
    'name': "Halo",
}, {
    'font': "hexore-webfont",
    'name': "Hexore",
}, {
    'font': "Korian",
    'name': "Korian",
}, {
    'font': "Lavanderia-Regular",
    'name': "Lavanderia",
}, {
    'font': "Modesta",
    'name': "Modesta",
}, {
    'font': "Monteryn",
    'name': "Monteryn",
}, {
    'font': "neoneon-webfont",
    'name': "Neoneon",
}
];
