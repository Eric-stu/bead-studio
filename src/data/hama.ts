import { BeadColor } from '../types'

/**
 * Hama Midi 5mm bead colors
 *
 * Color codes and names are based on the official Hama Midi palette.
 * Hex values are approximations of the actual bead colors.
 *
 * Sources: Hama official catalog, community references.
 * Note: Some colors have been discontinued or renamed over the years.
 * Not all codes are sequential — gaps exist where colors were retired.
 */
export const hamaColors: BeadColor[] = [
  // ─── Whites & Blacks ───────────────────────────────────────────
  { id: 'hama-01', name: 'White', hex: '#FFFFFF', brand: 'hama', code: '01' },
  { id: 'hama-18', name: 'Black', hex: '#1A1A1A', brand: 'hama', code: '18' },

  // ─── Grays ─────────────────────────────────────────────────────
  { id: 'hama-17', name: 'Grey', hex: '#A0A0A0', brand: 'hama', code: '17' },
  { id: 'hama-56', name: 'Dark Grey', hex: '#606060', brand: 'hama', code: '56' },
  { id: 'hama-62', name: 'Light Grey', hex: '#C8C8C8', brand: 'hama', code: '62' },

  // ─── Creams & Neutrals ────────────────────────────────────────
  { id: 'hama-02', name: 'Cream', hex: '#FFF0C0', brand: 'hama', code: '02' },
  { id: 'hama-73', name: 'Ivory', hex: '#FFFCE8', brand: 'hama', code: '73' },
  { id: 'hama-61', name: 'Sand', hex: '#E8D8B0', brand: 'hama', code: '61' },
  { id: 'hama-78', name: 'Stone Grey', hex: '#B8AFA0', brand: 'hama', code: '78' },
  { id: 'hama-88', name: 'Warm Grey', hex: '#A89888', brand: 'hama', code: '88' },

  // ─── Yellows ───────────────────────────────────────────────────
  { id: 'hama-03', name: 'Yellow', hex: '#FFD100', brand: 'hama', code: '03' },
  { id: 'hama-21', name: 'Pastel Yellow', hex: '#FFF08C', brand: 'hama', code: '21' },
  { id: 'hama-26', name: 'Neon Yellow', hex: '#EEFF00', brand: 'hama', code: '26' },

  // ─── Oranges ───────────────────────────────────────────────────
  { id: 'hama-04', name: 'Orange', hex: '#FF8800', brand: 'hama', code: '04' },
  { id: 'hama-27', name: 'Neon Orange', hex: '#FF6600', brand: 'hama', code: '27' },

  // ─── Reds ──────────────────────────────────────────────────────
  { id: 'hama-05', name: 'Red', hex: '#CC0000', brand: 'hama', code: '05' },
  { id: 'hama-06', name: 'Dark Red', hex: '#8B0000', brand: 'hama', code: '06' },
  { id: 'hama-28', name: 'Neon Red', hex: '#FF1A1A', brand: 'hama', code: '28' },
  { id: 'hama-80', name: 'Cherry Red', hex: '#C41E3A', brand: 'hama', code: '80' },

  // ─── Pinks ─────────────────────────────────────────────────────
  { id: 'hama-24', name: 'Pink', hex: '#FF69B4', brand: 'hama', code: '24' },
  { id: 'hama-25', name: 'Pastel Pink', hex: '#FFB6C1', brand: 'hama', code: '25' },
  { id: 'hama-51', name: 'Neon Pink', hex: '#FF0090', brand: 'hama', code: '51' },
  { id: 'hama-66', name: 'Salmon', hex: '#FA8072', brand: 'hama', code: '66' },
  { id: 'hama-75', name: 'Dusty Rose', hex: '#D4868A', brand: 'hama', code: '75' },
  { id: 'hama-76', name: 'Antique Rose', hex: '#C08080', brand: 'hama', code: '76' },

  // ─── Purples ───────────────────────────────────────────────────
  { id: 'hama-07', name: 'Purple', hex: '#7B2D8B', brand: 'hama', code: '07' },
  { id: 'hama-23', name: 'Pastel Lavender', hex: '#D8B0FF', brand: 'hama', code: '23' },
  { id: 'hama-46', name: 'Pearl Lilac', hex: '#C8A0E0', brand: 'hama', code: '46' },
  { id: 'hama-83', name: 'Plum', hex: '#6A2C70', brand: 'hama', code: '83' },
  { id: 'hama-89', name: 'Dusty Purple', hex: '#8B7DA8', brand: 'hama', code: '89' },

  // ─── Blues ──────────────────────────────────────────────────────
  { id: 'hama-08', name: 'Dark Blue', hex: '#003366', brand: 'hama', code: '08' },
  { id: 'hama-09', name: 'Blue', hex: '#0066CC', brand: 'hama', code: '09' },
  { id: 'hama-10', name: 'Light Blue', hex: '#66B2FF', brand: 'hama', code: '10' },
  { id: 'hama-22', name: 'Pastel Blue', hex: '#A0D0FF', brand: 'hama', code: '22' },
  { id: 'hama-57', name: 'Medium Blue', hex: '#3388CC', brand: 'hama', code: '57' },
  { id: 'hama-68', name: 'Royal Blue', hex: '#0044AA', brand: 'hama', code: '68' },
  { id: 'hama-82', name: 'Pacific Blue', hex: '#1C7FC0', brand: 'hama', code: '82' },
  { id: 'hama-94', name: 'Cornflower', hex: '#6495ED', brand: 'hama', code: '94' },
  { id: 'hama-95', name: 'Periwinkle', hex: '#8898D8', brand: 'hama', code: '95' },

  // ─── Turquoise & Teal ──────────────────────────────────────────
  { id: 'hama-11', name: 'Turquoise', hex: '#00C8B4', brand: 'hama', code: '11' },
  { id: 'hama-67', name: 'Light Turquoise', hex: '#48D8CC', brand: 'hama', code: '67' },
  { id: 'hama-72', name: 'Teal', hex: '#008080', brand: 'hama', code: '72' },
  { id: 'hama-91', name: 'Seafoam', hex: '#6ECBAB', brand: 'hama', code: '91' },

  // ─── Greens ────────────────────────────────────────────────────
  { id: 'hama-12', name: 'Green', hex: '#339933', brand: 'hama', code: '12' },
  { id: 'hama-13', name: 'Dark Green', hex: '#006633', brand: 'hama', code: '13' },
  { id: 'hama-20', name: 'Pastel Green', hex: '#88E888', brand: 'hama', code: '20' },
  { id: 'hama-29', name: 'Neon Green', hex: '#33FF33', brand: 'hama', code: '29' },
  { id: 'hama-63', name: 'Mint Green', hex: '#98E8C8', brand: 'hama', code: '63' },
  { id: 'hama-69', name: 'Olive', hex: '#6B8E23', brand: 'hama', code: '69' },
  { id: 'hama-81', name: 'Spring Green', hex: '#3CB371', brand: 'hama', code: '81' },
  { id: 'hama-85', name: 'Forest Green', hex: '#228B22', brand: 'hama', code: '85' },

  // ─── Browns ────────────────────────────────────────────────────
  { id: 'hama-14', name: 'Brown', hex: '#8B572A', brand: 'hama', code: '14' },
  { id: 'hama-15', name: 'Light Brown', hex: '#C49A6C', brand: 'hama', code: '15' },
  { id: 'hama-71', name: 'Rust', hex: '#B7410E', brand: 'hama', code: '71' },
  { id: 'hama-84', name: 'Goldenrod', hex: '#DAA520', brand: 'hama', code: '84' },

  // ─── Skin / Flesh Tones ───────────────────────────────────────
  { id: 'hama-16', name: 'Peach', hex: '#FFDAB9', brand: 'hama', code: '16' },
  { id: 'hama-19', name: 'Beige', hex: '#E8D0B0', brand: 'hama', code: '19' },
  { id: 'hama-54', name: 'Flesh', hex: '#F0C8A0', brand: 'hama', code: '54' },
  { id: 'hama-65', name: 'Flesh Pink', hex: '#E8B0A0', brand: 'hama', code: '65' },

  // ─── Neon (Fluorescent) ────────────────────────────────────────
  { id: 'hama-30', name: 'Neon Blue', hex: '#00E0FF', brand: 'hama', code: '30' },
  { id: 'hama-60', name: 'Neon Coral', hex: '#FF6060', brand: 'hama', code: '60' },

  // ─── Transparent ───────────────────────────────────────────────
  { id: 'hama-31', name: 'Transparent Red', hex: '#FF3030', brand: 'hama', code: '31' },
  { id: 'hama-32', name: 'Transparent Orange', hex: '#FF8800', brand: 'hama', code: '32' },
  { id: 'hama-33', name: 'Transparent Yellow', hex: '#FFE030', brand: 'hama', code: '33' },
  { id: 'hama-34', name: 'Transparent Green', hex: '#30CC30', brand: 'hama', code: '34' },
  { id: 'hama-35', name: 'Transparent Blue', hex: '#3080DD', brand: 'hama', code: '35' },
  { id: 'hama-36', name: 'Transparent Purple', hex: '#9040C0', brand: 'hama', code: '36' },
  { id: 'hama-37', name: 'Transparent Pink', hex: '#FF80A0', brand: 'hama', code: '37' },
  { id: 'hama-38', name: 'Transparent', hex: '#E8E8E8', brand: 'hama', code: '38' },
  { id: 'hama-52', name: 'Transparent Light Blue', hex: '#80C8FF', brand: 'hama', code: '52' },
  { id: 'hama-53', name: 'Transparent Turquoise', hex: '#40D8C0', brand: 'hama', code: '53' },

  // ─── Pearl (Glazed) ───────────────────────────────────────────
  { id: 'hama-39', name: 'Pearl White', hex: '#F0F0F0', brand: 'hama', code: '39' },
  { id: 'hama-40', name: 'Pearl Light Blue', hex: '#A0C8E8', brand: 'hama', code: '40' },
  { id: 'hama-41', name: 'Pearl Light Green', hex: '#A0D8B0', brand: 'hama', code: '41' },
  { id: 'hama-42', name: 'Pearl Pink', hex: '#F0B0C0', brand: 'hama', code: '42' },
  { id: 'hama-43', name: 'Pearl Yellow', hex: '#F0E080', brand: 'hama', code: '43' },
  { id: 'hama-44', name: 'Pearl Red', hex: '#D02020', brand: 'hama', code: '44' },
  { id: 'hama-45', name: 'Pearl Dark Blue', hex: '#3060A0', brand: 'hama', code: '45' },

  // ─── Metallic / Glitter / Special ──────────────────────────────
  { id: 'hama-47', name: 'Glitter Gold', hex: '#D4A800', brand: 'hama', code: '47' },
  { id: 'hama-48', name: 'Glitter Silver', hex: '#C0C0C0', brand: 'hama', code: '48' },
  { id: 'hama-49', name: 'Copper', hex: '#B87333', brand: 'hama', code: '49' },
  { id: 'hama-50', name: 'Glow in the Dark', hex: '#E0FFE0', brand: 'hama', code: '50' },

  // ─── Additional / Newer Colors ─────────────────────────────────
  { id: 'hama-64', name: 'Lavender', hex: '#B0A0D0', brand: 'hama', code: '64' },
  { id: 'hama-74', name: 'Apricot', hex: '#FFB070', brand: 'hama', code: '74' },
  { id: 'hama-92', name: 'Coral', hex: '#FF6F61', brand: 'hama', code: '92' },
]
