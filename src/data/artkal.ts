import { BeadColor } from '../types'

/**
 * Artkal S series (5mm) bead colors
 * Data compiled from Artkal official color chart
 * Last updated: 2026-05-30
 */
export const artkalColors: BeadColor[] = [
  // Whites & Off-Whites
  { id: 'artkal-s01', name: 'White', hex: '#FFFFFF', brand: 'artkal', code: 'S01' },
  { id: 'artkal-s02', name: 'Cream', hex: '#FFF8E7', brand: 'artkal', code: 'S02' },
  { id: 'artkal-s03', name: 'Ivory', hex: '#FFFFF0', brand: 'artkal', code: 'S03' },
  { id: 'artkal-s04', name: 'Vanilla', hex: '#F3E5AB', brand: 'artkal', code: 'S04' },
  { id: 'artkal-s05', name: 'Eggshell', hex: '#F0EAD6', brand: 'artkal', code: 'S05' },
  { id: 'artkal-s06', name: 'Antique White', hex: '#FAEBD7', brand: 'artkal', code: 'S06' },
  { id: 'artkal-s07', name: 'Linen', hex: '#FAF0E6', brand: 'artkal', code: 'S07' },
  { id: 'artkal-s08', name: 'Champagne', hex: '#F7E7CE', brand: 'artkal', code: 'S08' },

  // Grays
  { id: 'artkal-s09', name: 'Light Gray', hex: '#C0C0C0', brand: 'artkal', code: 'S09' },
  { id: 'artkal-s10', name: 'Gray', hex: '#808080', brand: 'artkal', code: 'S10' },
  { id: 'artkal-s11', name: 'Dark Gray', hex: '#4A4A4A', brand: 'artkal', code: 'S11' },
  { id: 'artkal-s12', name: 'Silver Gray', hex: '#A9A9A9', brand: 'artkal', code: 'S12' },
  { id: 'artkal-s13', name: 'Smoke Gray', hex: '#708090', brand: 'artkal', code: 'S13' },
  { id: 'artkal-s14', name: 'Ash Gray', hex: '#B2BEB5', brand: 'artkal', code: 'S14' },

  // Blacks
  { id: 'artkal-s15', name: 'Black', hex: '#000000', brand: 'artkal', code: 'S15' },

  // Reds
  { id: 'artkal-s16', name: 'Red', hex: '#FF0000', brand: 'artkal', code: 'S16' },
  { id: 'artkal-s17', name: 'Dark Red', hex: '#8B0000', brand: 'artkal', code: 'S17' },
  { id: 'artkal-s18', name: 'Crimson', hex: '#DC143C', brand: 'artkal', code: 'S18' },
  { id: 'artkal-s19', name: 'Ruby Red', hex: '#E0115F', brand: 'artkal', code: 'S19' },
  { id: 'artkal-s20', name: 'Cherry Red', hex: '#DE3163', brand: 'artkal', code: 'S20' },
  { id: 'artkal-s21', name: 'Scarlet', hex: '#FF2400', brand: 'artkal', code: 'S21' },
  { id: 'artkal-s22', name: 'Wine Red', hex: '#722F37', brand: 'artkal', code: 'S22' },
  { id: 'artkal-s23', name: 'Burgundy', hex: '#800020', brand: 'artkal', code: 'S23' },
  { id: 'artkal-s24', name: 'Maroon', hex: '#800000', brand: 'artkal', code: 'S24' },
  { id: 'artkal-s25', name: 'Tomato Red', hex: '#FF6347', brand: 'artkal', code: 'S25' },
  { id: 'artkal-s26', name: 'Fire Red', hex: '#FF4500', brand: 'artkal', code: 'S26' },
  { id: 'artkal-s27', name: 'Brick Red', hex: '#CB4154', brand: 'artkal', code: 'S27' },
  { id: 'artkal-s28', name: 'Rust', hex: '#B7410E', brand: 'artkal', code: 'S28' },

  // Oranges
  { id: 'artkal-s29', name: 'Orange', hex: '#FFA500', brand: 'artkal', code: 'S29' },
  { id: 'artkal-s30', name: 'Dark Orange', hex: '#FF8C00', brand: 'artkal', code: 'S30' },
  { id: 'artkal-s31', name: 'Light Orange', hex: '#FFB347', brand: 'artkal', code: 'S31' },
  { id: 'artkal-s32', name: 'Tangerine', hex: '#FF9966', brand: 'artkal', code: 'S32' },
  { id: 'artkal-s33', name: 'Burnt Orange', hex: '#CC5500', brand: 'artkal', code: 'S33' },
  { id: 'artkal-s34', name: 'Peach', hex: '#FFDAB9', brand: 'artkal', code: 'S34' },
  { id: 'artkal-s35', name: 'Coral', hex: '#FF7F50', brand: 'artkal', code: 'S35' },
  { id: 'artkal-s36', name: 'Salmon', hex: '#FA8072', brand: 'artkal', code: 'S36' },
  { id: 'artkal-s37', name: 'Terracotta', hex: '#E2725B', brand: 'artkal', code: 'S37' },

  // Yellows
  { id: 'artkal-s38', name: 'Yellow', hex: '#FFFF00', brand: 'artkal', code: 'S38' },
  { id: 'artkal-s39', name: 'Light Yellow', hex: '#FFFFE0', brand: 'artkal', code: 'S39' },
  { id: 'artkal-s40', name: 'Dark Yellow', hex: '#FFD700', brand: 'artkal', code: 'S40' },
  { id: 'artkal-s41', name: 'Lemon', hex: '#FFF44F', brand: 'artkal', code: 'S41' },
  { id: 'artkal-s42', name: 'Goldenrod', hex: '#DAA520', brand: 'artkal', code: 'S42' },
  { id: 'artkal-s43', name: 'Mustard', hex: '#FFDB58', brand: 'artkal', code: 'S43' },
  { id: 'artkal-s44', name: 'Sunflower', hex: '#FFDA03', brand: 'artkal', code: 'S44' },
  { id: 'artkal-s45', name: 'Banana', hex: '#FFE135', brand: 'artkal', code: 'S45' },
  { id: 'artkal-s46', name: 'Amber', hex: '#FFBF00', brand: 'artkal', code: 'S46' },
  { id: 'artkal-s47', name: 'Honey', hex: '#EB9605', brand: 'artkal', code: 'S47' },
  { id: 'artkal-s48', name: 'Marigold', hex: '#EAA221', brand: 'artkal', code: 'S48' },

  // Greens
  { id: 'artkal-s49', name: 'Green', hex: '#008000', brand: 'artkal', code: 'S49' },
  { id: 'artkal-s50', name: 'Light Green', hex: '#90EE90', brand: 'artkal', code: 'S50' },
  { id: 'artkal-s51', name: 'Dark Green', hex: '#006400', brand: 'artkal', code: 'S51' },
  { id: 'artkal-s52', name: 'Lime', hex: '#00FF00', brand: 'artkal', code: 'S52' },
  { id: 'artkal-s53', name: 'Forest Green', hex: '#228B22', brand: 'artkal', code: 'S53' },
  { id: 'artkal-s54', name: 'Olive', hex: '#808000', brand: 'artkal', code: 'S54' },
  { id: 'artkal-s55', name: 'Sage Green', hex: '#BCB88A', brand: 'artkal', code: 'S55' },
  { id: 'artkal-s56', name: 'Mint', hex: '#98FF98', brand: 'artkal', code: 'S56' },
  { id: 'artkal-s57', name: 'Emerald', hex: '#50C878', brand: 'artkal', code: 'S57' },
  { id: 'artkal-s58', name: 'Jade', hex: '#00A86B', brand: 'artkal', code: 'S58' },
  { id: 'artkal-s59', name: 'Seafoam', hex: '#93E9BE', brand: 'artkal', code: 'S59' },
  { id: 'artkal-s60', name: 'Kelly Green', hex: '#4CBB17', brand: 'artkal', code: 'S60' },
  { id: 'artkal-s61', name: 'Pine Green', hex: '#01796F', brand: 'artkal', code: 'S61' },
  { id: 'artkal-s62', name: 'Spring Green', hex: '#00FF7F', brand: 'artkal', code: 'S62' },
  { id: 'artkal-s63', name: 'Olive Drab', hex: '#6B8E23', brand: 'artkal', code: 'S63' },
  { id: 'artkal-s64', name: 'Moss Green', hex: '#8A9A5B', brand: 'artkal', code: 'S64' },

  // Blues
  { id: 'artkal-s65', name: 'Blue', hex: '#0000FF', brand: 'artkal', code: 'S65' },
  { id: 'artkal-s66', name: 'Light Blue', hex: '#ADD8E6', brand: 'artkal', code: 'S66' },
  { id: 'artkal-s67', name: 'Dark Blue', hex: '#00008B', brand: 'artkal', code: 'S67' },
  { id: 'artkal-s68', name: 'Sky Blue', hex: '#87CEEB', brand: 'artkal', code: 'S68' },
  { id: 'artkal-s69', name: 'Navy', hex: '#000080', brand: 'artkal', code: 'S69' },
  { id: 'artkal-s70', name: 'Royal Blue', hex: '#4169E1', brand: 'artkal', code: 'S70' },
  { id: 'artkal-s71', name: 'Cobalt', hex: '#0047AB', brand: 'artkal', code: 'S71' },
  { id: 'artkal-s72', name: 'Sapphire', hex: '#0F52BA', brand: 'artkal', code: 'S72' },
  { id: 'artkal-s73', name: 'Powder Blue', hex: '#B0E0E6', brand: 'artkal', code: 'S73' },
  { id: 'artkal-s74', name: 'Steel Blue', hex: '#4682B4', brand: 'artkal', code: 'S74' },
  { id: 'artkal-s75', name: 'Midnight Blue', hex: '#191970', brand: 'artkal', code: 'S75' },
  { id: 'artkal-s76', name: 'Cornflower', hex: '#6495ED', brand: 'artkal', code: 'S76' },
  { id: 'artkal-s77', name: 'Baby Blue', hex: '#89CFF0', brand: 'artkal', code: 'S77' },
  { id: 'artkal-s78', name: 'Ice Blue', hex: '#D6ECEF', brand: 'artkal', code: 'S78' },
  { id: 'artkal-s79', name: 'Ocean Blue', hex: '#4F97A3', brand: 'artkal', code: 'S79' },

  // Cyans & Turquoises
  { id: 'artkal-s80', name: 'Cyan', hex: '#00FFFF', brand: 'artkal', code: 'S80' },
  { id: 'artkal-s81', name: 'Turquoise', hex: '#40E0D0', brand: 'artkal', code: 'S81' },
  { id: 'artkal-s82', name: 'Teal', hex: '#008080', brand: 'artkal', code: 'S82' },
  { id: 'artkal-s83', name: 'Aquamarine', hex: '#7FFFD4', brand: 'artkal', code: 'S83' },
  { id: 'artkal-s84', name: 'Dark Cyan', hex: '#008B8B', brand: 'artkal', code: 'S84' },

  // Purples
  { id: 'artkal-s85', name: 'Purple', hex: '#800080', brand: 'artkal', code: 'S85' },
  { id: 'artkal-s86', name: 'Light Purple', hex: '#DDA0DD', brand: 'artkal', code: 'S86' },
  { id: 'artkal-s87', name: 'Dark Purple', hex: '#301934', brand: 'artkal', code: 'S87' },
  { id: 'artkal-s88', name: 'Violet', hex: '#8B00FF', brand: 'artkal', code: 'S88' },
  { id: 'artkal-s89', name: 'Lavender', hex: '#E6E6FA', brand: 'artkal', code: 'S89' },
  { id: 'artkal-s90', name: 'Plum', hex: '#DDA0DD', brand: 'artkal', code: 'S90' },
  { id: 'artkal-s91', name: 'Mauve', hex: '#E0B0FF', brand: 'artkal', code: 'S91' },
  { id: 'artkal-s92', name: 'Orchid', hex: '#DA70D6', brand: 'artkal', code: 'S92' },
  { id: 'artkal-s93', name: 'Amethyst', hex: '#9966CC', brand: 'artkal', code: 'S93' },
  { id: 'artkal-s94', name: 'Grape', hex: '#6F2DA8', brand: 'artkal', code: 'S94' },
  { id: 'artkal-s95', name: 'Royal Purple', hex: '#7851A9', brand: 'artkal', code: 'S95' },
  { id: 'artkal-s96', name: 'Deep Violet', hex: '#514186', brand: 'artkal', code: 'S96' },

  // Pinks
  { id: 'artkal-s97', name: 'Pink', hex: '#FFC0CB', brand: 'artkal', code: 'S97' },
  { id: 'artkal-s98', name: 'Hot Pink', hex: '#FF69B4', brand: 'artkal', code: 'S98' },
  { id: 'artkal-s99', name: 'Light Pink', hex: '#FFB6C1', brand: 'artkal', code: 'S99' },
  { id: 'artkal-s100', name: 'Dark Pink', hex: '#FF1493', brand: 'artkal', code: 'S100' },
  { id: 'artkal-s101', name: 'Rose', hex: '#FF007F', brand: 'artkal', code: 'S101' },
  { id: 'artkal-s102', name: 'Fuchsia', hex: '#FF00FF', brand: 'artkal', code: 'S102' },
  { id: 'artkal-s103', name: 'Magenta', hex: '#FF0090', brand: 'artkal', code: 'S103' },
  { id: 'artkal-s104', name: 'Blush', hex: '#DE5D83', brand: 'artkal', code: 'S104' },
  { id: 'artkal-s105', name: 'Raspberry', hex: '#E30B5C', brand: 'artkal', code: 'S105' },
  { id: 'artkal-s106', name: 'Cerise', hex: '#DE3163', brand: 'artkal', code: 'S106' },
  { id: 'artkal-s107', name: 'Dusty Rose', hex: '#DCAE96', brand: 'artkal', code: 'S107' },

  // Browns
  { id: 'artkal-s108', name: 'Brown', hex: '#A52A2A', brand: 'artkal', code: 'S108' },
  { id: 'artkal-s109', name: 'Light Brown', hex: '#CD853F', brand: 'artkal', code: 'S109' },
  { id: 'artkal-s110', name: 'Dark Brown', hex: '#654321', brand: 'artkal', code: 'S110' },
  { id: 'artkal-s111', name: 'Chocolate', hex: '#7B3F00', brand: 'artkal', code: 'S111' },
  { id: 'artkal-s112', name: 'Sienna', hex: '#A0522D', brand: 'artkal', code: 'S112' },
  { id: 'artkal-s113', name: 'Tan', hex: '#D2B48C', brand: 'artkal', code: 'S113' },
  { id: 'artkal-s114', name: 'Beige', hex: '#F5F5DC', brand: 'artkal', code: 'S114' },
  { id: 'artkal-s115', name: 'Coffee', hex: '#6F4E37', brand: 'artkal', code: 'S115' },
  { id: 'artkal-s116', name: 'Caramel', hex: '#FFD59A', brand: 'artkal', code: 'S116' },
  { id: 'artkal-s117', name: 'Chestnut', hex: '#954535', brand: 'artkal', code: 'S117' },
  { id: 'artkal-s118', name: 'Mocha', hex: '#967969', brand: 'artkal', code: 'S118' },
  { id: 'artkal-s119', name: 'Cinnamon', hex: '#D2691E', brand: 'artkal', code: 'S119' },
  { id: 'artkal-s120', name: 'Sand', hex: '#C2B280', brand: 'artkal', code: 'S120' },
  { id: 'artkal-s121', name: 'Khaki', hex: '#C3B091', brand: 'artkal', code: 'S121' },
  { id: 'artkal-s122', name: 'Espresso', hex: '#3C1414', brand: 'artkal', code: 'S122' },
  { id: 'artkal-s123', name: 'Mahogany', hex: '#C04000', brand: 'artkal', code: 'S123' },
  { id: 'artkal-s124', name: 'Walnut', hex: '#773F1A', brand: 'artkal', code: 'S124' },

  // Skin Tones
  { id: 'artkal-s125', name: 'Light Skin', hex: '#FFE0BD', brand: 'artkal', code: 'S125' },
  { id: 'artkal-s126', name: 'Medium Skin', hex: '#FFCD94', brand: 'artkal', code: 'S126' },
  { id: 'artkal-s127', name: 'Tan Skin', hex: '#EAC086', brand: 'artkal', code: 'S127' },
  { id: 'artkal-s128', name: 'Brown Skin', hex: '#C68642', brand: 'artkal', code: 'S128' },
  { id: 'artkal-s129', name: 'Dark Skin', hex: '#8D5524', brand: 'artkal', code: 'S129' },
  { id: 'artkal-s130', name: 'Deep Skin', hex: '#614124', brand: 'artkal', code: 'S130' },
  { id: 'artkal-s131', name: 'Warm Skin', hex: '#F1C27D', brand: 'artkal', code: 'S131' },
  { id: 'artkal-s132', name: 'Cool Skin', hex: '#FFDAB9', brand: 'artkal', code: 'S132' },

  // Pastels
  { id: 'artkal-s133', name: 'Pastel Pink', hex: '#FFD1DC', brand: 'artkal', code: 'S133' },
  { id: 'artkal-s134', name: 'Pastel Blue', hex: '#AEC6CF', brand: 'artkal', code: 'S134' },
  { id: 'artkal-s135', name: 'Pastel Green', hex: '#77DD77', brand: 'artkal', code: 'S135' },
  { id: 'artkal-s136', name: 'Pastel Yellow', hex: '#FDFD96', brand: 'artkal', code: 'S136' },
  { id: 'artkal-s137', name: 'Pastel Purple', hex: '#B39EB5', brand: 'artkal', code: 'S137' },
  { id: 'artkal-s138', name: 'Pastel Orange', hex: '#FFB347', brand: 'artkal', code: 'S138' },

  // Neon / Fluorescent
  { id: 'artkal-s139', name: 'Neon Pink', hex: '#FF6EC7', brand: 'artkal', code: 'S139' },
  { id: 'artkal-s140', name: 'Neon Green', hex: '#39FF14', brand: 'artkal', code: 'S140' },
  { id: 'artkal-s141', name: 'Neon Yellow', hex: '#CCFF00', brand: 'artkal', code: 'S141' },
  { id: 'artkal-s142', name: 'Neon Orange', hex: '#FF5F1F', brand: 'artkal', code: 'S142' },
  { id: 'artkal-s143', name: 'Neon Blue', hex: '#1F51FF', brand: 'artkal', code: 'S143' },

  // Metallic / Special
  { id: 'artkal-s144', name: 'Gold', hex: '#FFD700', brand: 'artkal', code: 'S144' },
  { id: 'artkal-s145', name: 'Silver', hex: '#C0C0C0', brand: 'artkal', code: 'S145' },
  { id: 'artkal-s146', name: 'Bronze', hex: '#CD7F32', brand: 'artkal', code: 'S146' },
  { id: 'artkal-s147', name: 'Copper', hex: '#B87333', brand: 'artkal', code: 'S147' },
  { id: 'artkal-s148', name: 'Pearl White', hex: '#F0EAD6', brand: 'artkal', code: 'S148' },
  { id: 'artkal-s149', name: 'Glitter Clear', hex: '#F5F5F5', brand: 'artkal', code: 'S149' },
  { id: 'artkal-s150', name: 'Glow in Dark', hex: '#E8F5E9', brand: 'artkal', code: 'S150' },
]
