import React from 'react';

const prNameList = {
    "d99732aa-6667-11e3-89ff-01f464e0362d" : "Blaisy-Bas",
    "d9811664-6667-11e3-89ff-01f464e0362d" : "Nuits-sous-Ravières",
    "8ef34af2-bd17-11e9-bdff-0188b2273146" : "Les Laumes-Alésia",
    "d9b4f7c4-6667-11e3-89ff-01f464e0362d" : "Aisy",
    "d98678b4-6667-11e3-89ff-01f464e0362d" : "Dijon-Ville",
    "d9e477f0-6667-11e3-89ff-01f464e0362d" : "Tonnerre",
    "d9ca7cb4-6667-11e3-89ff-01f464e0362d" : "Dijon-Ville",
    "d99d579e-6667-11e3-89ff-01f464e0362d" : "Les Laumes-Alésia",
    "d977a4e4-6667-11e3-89ff-01f464e0362d" : "Darcey (Côte-d'Or)",
    "d9795ff4-6667-11e3-89ff-01f464e0362d" : "Tonnerre",
    "d9e02a4a-6667-11e3-89ff-01f464e0362d" : "Velars",
    "d9dc8ccc-6667-11e3-89ff-01f464e0362d" : "Tonnerre",
    "d989093a-6667-11e3-89ff-01f464e0362d" : "Tonnerre",
    "d9860048-6667-11e3-89ff-01f464e0362d" : "Aisy",
    "d990a614-6667-11e3-89ff-01f464e0362d" : "Les Laumes-Alésia",
    "d98904ce-6667-11e3-89ff-01f464e0362d" : "Port-Sec-de-Pacy",
    "d9a919ce-6667-11e3-89ff-01f464e0362d" : "Lantenay",
    "8ef21fb6-bd17-11e9-bdff-0188b2273146" : "Les Laumes-Alésia",
    "d9e49622-6667-11e3-89ff-01f464e0362d" : "Montbard",
    "dd22822a-bd30-11e9-80ff-01686fb51c27" : "Montbard",
    "d9798d1a-6667-11e3-89ff-01f464e0362d" : "Perrigny-Triage",
    "d99e7c30-6667-11e3-89ff-01f464e0362d" : "Les Laumes-Alésia",
    "d9ad6036-6667-11e3-89ff-01f464e0362d" : "Dijon-Ville",
    "d9c6b75c-6667-11e3-89ff-01f464e0362d" : "Lézinnes",
    "d9c98822-6667-11e3-89ff-01f464e0362d" : "Verrey",
    "d9ddd970-6667-11e3-89ff-01f464e0362d" : "Plombières",
    "d991dbfc-6667-11e3-89ff-01f464e0362d" : "Mâlain",
    "d9c96c10-6667-11e3-89ff-01f464e0362d" : "Verrey",
    "d99afc60-6667-11e3-89ff-01f464e0362d" : "Lézinnes",
    "d9c98c20-6667-11e3-89ff-01f464e0362d" : "Les Laumes-Alésia",
    "d9b4f46e-6667-11e3-89ff-01f464e0362d" : "St-Florentin-Vergigny",
    "d9b277ee-6667-11e3-89ff-01f464e0362d" : "Les Laumes-Alésia",
    "d9b48200-6667-11e3-89ff-01f464e0362d" : "Thenissey",
    "d9a11cae-6667-11e3-89ff-01f464e0362d" : "Tanlay",
    "d99e4816-6667-11e3-89ff-01f464e0362d" : "Velars",
    "d9726960-6667-11e3-89ff-01f464e0362d" : "Lézinnes",
    "d9d78d4c-6667-11e3-89ff-01f464e0362d" : "Mâlain",
    "d97525a2-6667-11e3-89ff-01f464e0362d" : "Mâlain",
    "d9beb42c-6667-11e3-89ff-01f464e0362d" : "Nuits-sous-Ravières",
    "d9ab46b4-6667-11e3-89ff-01f464e0362d" : "Montbard",
    "d15c3b94-bc66-11e9-bdff-0188b2273146" : "Les Laumes-Alésia",
    "d9c3e2ca-6667-11e3-89ff-01f464e0362d" : "Flogny",
    "d9c08982-6667-11e3-89ff-01f464e0362d" : "Darcey (Côte-d'Or)",
    "d9e19710-6667-11e3-89ff-01f464e0362d" : "Flogny",
    "d9a75b12-6667-11e3-89ff-01f464e0362d" : "Montbard",
    "d97dcb9c-6667-11e3-89ff-01f464e0362d" : "Ancy-le-Franc",
    "d992911e-6667-11e3-89ff-01f464e0362d" : "Tonnerre",
    "d97c4774-6667-11e3-89ff-01f464e0362d" : "Les Laumes-Alésia",
    "d9e4f3ac-6667-11e3-89ff-01f464e0362d" : "Lantenay",
    "d9e2d7ee-6667-11e3-89ff-01f464e0362d" : "Lézinnes",
    "d994a6ae-6667-11e3-89ff-01f464e0362d" : "Aisy",
}

const getName = (guid) => {
    return (prNameList[guid] != null) ? prNameList[guid] : guid;
}

const PrGare = ({ guid }) => {
    return (<p>{getName(guid)}</p>);
}

export default PrGare;

