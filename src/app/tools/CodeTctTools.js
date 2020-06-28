const tctCodeIdMap = {
    "FCB": "77e8acc5-2d5c-11e6-8bb5-01e08e116de3",
    "FCC": "7c996166-2d5c-11e6-a2d2-01e08e116de3",
    "FEC": "76982e97-2d5c-11e6-8203-01e08e116de3",
    "FER": "9009a7b6-2d5c-11e6-af37-01e08e116de3",
    "FLC": "9f1e1dc1-2d5c-11e6-9942-01e08e116de3",
    "FMB": "a87a1b74-2d5c-11e6-959d-01e08e116de3",
    "FRR": "8a559299-2d5c-11e6-820b-01e08e116de3",
    "FVC": "0460da1f-2d5d-11e6-b2be-01e08e116de3",
    "HYD": "013eacaf-2d5e-11e6-a2b9-01e08e116de3",
    "HZF": "807a7227-2d5c-11e6-b4aa-01e08e116de3",
    "HZI": "dbee4698-2d5d-11e6-83ca-01e08e116de3",
    "HZN": "fcaf8b51-2d5c-11e6-b540-01e08e116de3",
    "IAT": "844416b7-2d7b-11e6-a021-01148e116de3",
    "IEA": "ad77bd92-2d78-11e6-b578-01148e116de3",
    "IVO": "8ddbe0fe-2d5c-11e6-90ac-01e08e116de3",
    "JAB": "8492a97e-2d5d-11e6-93b3-01e08e116de3",
    "JAC": "ce7c9a7d-2d5d-11e6-8f95-01e08e116de3",
    "LBB": "ad4f8172-2d78-11e6-b384-01148e116de3",
    "LBC": "76ceb1ad-2d5c-11e6-8409-01e08e116de3",
    "LBG": "9ed9e77a-2d5c-11e6-95a2-01e08e116de3",
    "LBL": "5b3d758f-2d5c-11e6-89c5-01e08e116de3",
    "LCA": "3a4773c1-2d5d-11e6-9f32-01e08e116de3",
    "LVD": "5ab0ab1c-2d5c-11e6-83e7-01e08e116de3",
    "LVH": "5a58bbca-2d5c-11e6-802f-01e08e116de3",
    "RBD": "fe9e3ec5-2d5b-11e6-892f-01e08e116de3",
    "RBK": "6d957615-2d5c-11e6-8c5c-01e08e116de3",
    "RBS": "00b5e5f7-2d5c-11e6-90cb-01e08e116de3",
    "RCD": "6e53e9ee-2d5c-11e6-95fc-01e08e116de3",
    "RCK": "6dbb8ee8-2d5c-11e6-8dfd-01e08e116de3",
    "SCD": "dd4454d2-2d5c-11e6-9b0a-01e08e116de3",
    "SCK": "8872471c-2d5c-11e6-ac4c-01e08e116de3"
}

export const getCodesTctArray = () => {
    return Object.keys(tctCodeIdMap);
}

export const getCodeTctId = (tctCode) => {
     return tctCodeIdMap[tctCode];
}