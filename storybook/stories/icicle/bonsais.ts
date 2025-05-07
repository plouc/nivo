import conifersImg from '../assets/imgs/conifers.png'
import pinaceaeImg from '../assets/imgs/pinaceae.png'
import floweringImg from '../assets/imgs/flowering_fruiting_trees.png'
import deciduousImg from '../assets/imgs/deciduous_broadleaf.png'
import cupressaceaeImg from '../assets/imgs/cupressaceae.png'
import fagaceaeImg from '../assets/imgs/fagaceae.png'
import sapindaceaeImg from '../assets/imgs/sapindaceae.png'
import betulaceaeImg from '../assets/imgs/betulaceae.png'
import rosaceaeImg from '../assets/imgs/rosaceae.png'
import theaceaeImg from '../assets/imgs/theaceae.png'
import ericaceaeImg from '../assets/imgs/ericaceae.png'
import moraceaeImg from '../assets/imgs/moraceae.png'
import myrtaceaeImg from '../assets/imgs/myrtaceae.png'
import ulmaceaeImg from '../assets/imgs/ulmaceae.png'
import leguminosaeImg from '../assets/imgs/leguminosae.png'
import tropicalsImg from '../assets/imgs/tropicals_subtropicals.png'

export interface BonsaiNode {
    taxon: string
    img?: string
    aggCultivarCount?: number
    cultivarCount?: number
    displayValue?: number // log-scaled
    children?: BonsaiNode[]
}

export const withLogDisplay = (node: BonsaiNode): BonsaiNode => {
    const c = node.cultivarCount ?? 0
    const scaled = Math.log10(c + 1) * 10 // stretch to 0–~33

    return {
        ...node,
        displayValue: parseFloat(scaled.toFixed(2)),
        children: node.children?.map(withLogDisplay),
    }
}

export const invertLogDisplay = (displayValue: number): number => {
    // undo the multiply‐by‐10 and the log10(+1)
    const raw = Math.pow(10, displayValue / 10) - 1

    return Math.round(raw)
}

export const bonsaiData: BonsaiNode = {
    taxon: 'Bonsais',
    aggCultivarCount: 4654,
    children: [
        {
            taxon: 'Conifers',
            aggCultivarCount: 301,
            img: conifersImg,
            children: [
                {
                    taxon: 'Pinaceae',
                    aggCultivarCount: 111,
                    img: pinaceaeImg,
                    children: [
                        {
                            taxon: 'Pinus',
                            aggCultivarCount: 97,
                            children: [
                                { taxon: 'Pinus thunbergii', cultivarCount: 60 },
                                { taxon: 'Pinus parviflora', cultivarCount: 25 },
                                { taxon: 'Pinus sylvestris', cultivarCount: 12 },
                            ],
                        },
                        {
                            taxon: 'Picea',
                            aggCultivarCount: 12,
                            children: [
                                { taxon: 'Picea abies', cultivarCount: 8 },
                                { taxon: 'Picea jezoensis', cultivarCount: 4 },
                            ],
                        },
                        {
                            taxon: 'Larix',
                            aggCultivarCount: 2,
                            children: [{ taxon: 'Larix kaempferi', cultivarCount: 2 }],
                        },
                    ],
                },
                {
                    taxon: 'Cupressaceae',
                    aggCultivarCount: 190,
                    img: cupressaceaeImg,
                    children: [
                        {
                            taxon: 'Juniperus',
                            aggCultivarCount: 130,
                            children: [
                                { taxon: 'Juniperus procumbens', cultivarCount: 30 },
                                { taxon: 'Juniperus chinensis', cultivarCount: 80 },
                                { taxon: 'Juniperus rigida', cultivarCount: 20 },
                            ],
                        },
                        {
                            taxon: 'Chamaecyparis',
                            aggCultivarCount: 60,
                            children: [{ taxon: 'Chamaecyparis obtusa', cultivarCount: 60 }],
                        },
                    ],
                },
            ],
        },
        {
            taxon: 'Deciduous Broadleaf',
            aggCultivarCount: 1533,
            img: deciduousImg,
            children: [
                {
                    taxon: 'Fagaceae',
                    aggCultivarCount: 3,
                    img: fagaceaeImg,
                    children: [
                        {
                            taxon: 'Quercus',
                            aggCultivarCount: 3,
                            children: [
                                { taxon: 'Quercus serrata', cultivarCount: 2 },
                                { taxon: 'Quercus acutissima', cultivarCount: 1 },
                            ],
                        },
                    ],
                },
                {
                    taxon: 'Sapindaceae',
                    aggCultivarCount: 1437,
                    img: sapindaceaeImg,
                    children: [
                        {
                            taxon: 'Acer',
                            aggCultivarCount: 1437,
                            children: [
                                { taxon: 'Acer palmatum', cultivarCount: 1400 },
                                { taxon: 'Acer buergerianum', cultivarCount: 25 },
                                { taxon: 'Acer ginnala', cultivarCount: 12 },
                            ],
                        },
                    ],
                },
                {
                    taxon: 'Betulaceae',
                    aggCultivarCount: 7,
                    img: betulaceaeImg,
                    children: [
                        {
                            taxon: 'Carpinus',
                            aggCultivarCount: 4,
                            children: [
                                { taxon: 'Carpinus japonica', cultivarCount: 3 },
                                { taxon: 'Carpinus turczaninowii', cultivarCount: 1 },
                            ],
                        },
                        {
                            taxon: 'Betula',
                            aggCultivarCount: 3,
                            children: [{ taxon: 'Betula pendula', cultivarCount: 3 }],
                        },
                    ],
                },
                {
                    taxon: 'Ulmaceae',
                    aggCultivarCount: 86,
                    img: ulmaceaeImg,
                    children: [
                        {
                            taxon: 'Zelkova',
                            aggCultivarCount: 6,
                            children: [{ taxon: 'Zelkova serrata', cultivarCount: 6 }],
                        },
                        {
                            taxon: 'Ulmus',
                            aggCultivarCount: 80,
                            children: [
                                { taxon: 'Ulmus parvifolia', cultivarCount: 50 },
                                { taxon: 'Ulmus minor', cultivarCount: 30 },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            taxon: 'Flowering and Fruiting Trees',
            aggCultivarCount: 2786,
            img: floweringImg,
            children: [
                {
                    taxon: 'Rosaceae',
                    aggCultivarCount: 336,
                    img: rosaceaeImg,
                    children: [
                        {
                            taxon: 'Malus',
                            aggCultivarCount: 4,
                            children: [{ taxon: 'Malus halliana', cultivarCount: 4 }],
                        },
                        {
                            taxon: 'Prunus',
                            aggCultivarCount: 312,
                            children: [
                                { taxon: 'Prunus mume', cultivarCount: 10 },
                                { taxon: 'Prunus serrulata', cultivarCount: 300 },
                                { taxon: 'Prunus incisa', cultivarCount: 2 },
                            ],
                        },
                        {
                            taxon: 'Chaenomeles',
                            aggCultivarCount: 20,
                            children: [{ taxon: 'Chaenomeles speciosa', cultivarCount: 20 }],
                        },
                    ],
                },
                {
                    taxon: 'Theaceae',
                    aggCultivarCount: 2000,
                    img: theaceaeImg,
                    children: [
                        {
                            taxon: 'Camellia',
                            aggCultivarCount: 2000,
                            children: [{ taxon: 'Camellia japonica', cultivarCount: 2000 }],
                        },
                    ],
                },
                {
                    taxon: 'Ericaceae',
                    aggCultivarCount: 450,
                    img: ericaceaeImg,
                    children: [
                        {
                            taxon: 'Rhododendron',
                            aggCultivarCount: 450,
                            children: [
                                { taxon: 'Rhododendron indicum', cultivarCount: 300 },
                                { taxon: 'Rhododendron obtusum', cultivarCount: 150 },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            taxon: 'Tropicals and Subtropicals',
            aggCultivarCount: 34,
            img: tropicalsImg,
            children: [
                {
                    taxon: 'Moraceae',
                    aggCultivarCount: 8,
                    img: moraceaeImg,
                    children: [
                        {
                            taxon: 'Ficus',
                            aggCultivarCount: 8,
                            children: [
                                { taxon: 'Ficus retusa', cultivarCount: 3 },
                                { taxon: 'Ficus benjamina', cultivarCount: 5 },
                            ],
                        },
                    ],
                },
                {
                    taxon: 'Myrtaceae',
                    aggCultivarCount: 10,
                    img: myrtaceaeImg,
                    children: [
                        {
                            taxon: 'Syzygium',
                            aggCultivarCount: 10,
                            children: [{ taxon: 'Syzygium paniculatum', cultivarCount: 10 }],
                        },
                    ],
                },
                {
                    taxon: 'Leguminosae',
                    aggCultivarCount: 16,
                    img: leguminosaeImg,
                    children: [
                        {
                            taxon: 'Serissa',
                            aggCultivarCount: 15,
                            children: [{ taxon: 'Serissa foetida', cultivarCount: 15 }],
                        },
                        {
                            taxon: 'Tamarindus',
                            aggCultivarCount: 1,
                            children: [{ taxon: 'Tamarindus indica', cultivarCount: 1 }],
                        },
                    ],
                },
            ],
        },
    ],
}
