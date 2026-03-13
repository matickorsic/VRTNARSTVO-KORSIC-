import React, { useEffect, useRef, useState } from 'react';
import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Enoletnice",
    category: "Sezonsko",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769286530/IMG_2722_t9sls6.jpg", 
    imagePosition: "object-[center_55%]",
    description: "Bogata izbira sezonskega cvetja. Nudimo širok nabor visečih in pokončnih rastlin, primernih za sončne, senčne in polsenčne lege.",
    galleryImages: [
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292331/IMG_2771_lu0qws.jpg", title: "Sladki krompir" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292351/IMG_2807_gw3os5.jpg", title: "Begonije" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292350/IMG_2794_kmqzwv.jpg", title: "Begonije big" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292350/IMG_2790_qxrmuo.jpg", title: "Angleške gorečke" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292348/IMG_2786_e9qhjh.jpg", title: "Surfinije" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292344/IMG_2781_mxnb7c.jpg", title: "Begonije" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292339/IMG_2784_stj5jv.jpg", title: "Begonije" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292338/IMG_2783_wwmtwu.jpg", title: "Vinke" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292337/IMG_2779_y8lauw.jpg", title: "Mleček" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292336/IMG_2774_lnwvwy.jpg", title: "Bidens" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292330/IMG_2768_l1aiag.jpg", title: "Dipladenija" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292327/IMG_2766_vbcevs.jpg", title: "Nova gvineja" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292324/IMG_1247_voyanb.jpg", title: "Nageljni" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292322/IMG_1252_iyvolx.jpg", title: "Afriška marjetica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292322/IMG_1248_wmjuf8.jpg", title: "Dipladenija/marjetica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292321/IMG_1239_zrhemf.jpg", title: "Bakopa" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292319/IMG_1243_mtltv9.jpg", title: "Dipladenija" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292319/IMG_1237_xc05jf.jpg", title: "Zlati cekin" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292314/IMG_1236_r6m95u.jpg", title: "Grobelnik" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292313/IMG_1235_gugf9z.jpg", title: "Strukturke" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292310/IMG_1233_wmnlck.jpg", title: "Gorečke" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292308/IMG_1234_r8yprf.jpg", title: "Bršljanke" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292306/IMG_1202_u5nahm.jpg", title: "Mačehe" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292306/IMG_1231_dixamy.jpg", title: "Surfinije" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292306/IMG_1085_w4whu1.jpg", title: "Mačehe" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292299/IMG_1084_dmtlfw.jpg", title: "Mačehe" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292299/IMG_1082_cju9wm.jpg", title: "Bellis" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292296/IMG_1079_ve3ebd.jpg", title: "Trobentice" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292295/IMG_1065_ofgnh1.jpg", title: "Nageljni" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292295/IMG_1078_avrtlc.jpg", title: "Gazanije" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292294/IMG_0846_nxdf2v.jpg", title: "Trobentice" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292293/IMG_1083_xkqayk.jpg", title: "Mačehe" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292287/IMG_0855_qg7d9l.jpg", title: "Margerite" }
    ]
  },
  {
    id: 2,
    name: "Trajnice",
    category: "Vrt",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769287431/IMG_1087_tmn91g.jpg", 
    imagePosition: "object-[center_45%]",
    description: "Trpežne rastline, ki se vračajo vsako leto. Pri nas najdete vse od okrasnih trav, cvetočih in plezajočih trajnic, pa vse do različnih zelišč.",
    galleryImages: [
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365280/IMG_1087_tghz6r.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365335/IMG_1222_z2ojgm.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365343/IMG_F7181367-3D2E-43E8-8741-A181BBE854A7_htp9nd.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365305/IMG_1214_ct2vky.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365373/IMG_2816_ayfuwf.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365293/IMG_0842_avsrkw.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365366/IMG_2764_hkbpfy.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365319/IMG_1216_sadgnd.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365351/IMG_1247_v5pbgv.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365280/IMG_0854_obyj0u.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365324/IMG_1217_t9rswu.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365371/IMG_2793_hkee1w.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365300/IMG_1210_uoupdg.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365365/IMG_2806_ycrhnc.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365344/IMG_1078_er1gac.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365322/IMG_0849_jos1ov.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365289/IMG_1208_thseqm.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365365/IMG_2768_zwgxv9.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365349/IMG_1243_wrfbgf.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365273/IMG_1081_n0xcf5.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365305/IMG_1212_ge47vn.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365333/IMG_1218_jmug4t.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365375/IMG_2817_arj5a8.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365313/IMG_0844_rutxdv.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365325/IMG_0848_pxngwk.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365338/IMG_1075_equerw.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365280/IMG_1077_sbyfph.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365366/IMG_2767_dxnyey.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365329/IMG_0845_ptl4nw.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365286/IMG_1089_hwehjx.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365344/IMG_1225_t8xg5b.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365300/IMG_1211_hrjkao.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365290/IMG_1088_z8cra4.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365313/IMG_0858_gefybg.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769292367/IMG_2817_woie9u.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365351/IMG_1240_t1cc9h.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365334/IMG_2C2E2A80-21F2-4A1D-8371-42B29DAD1008_ghrkcs.jpg", title: "Trajnica" },
      { url: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769365289/IMG_1207_kyjeyb.jpg", title: "Trajnica" }
    ]
  },
  {
    id: 3,
    name: "Sobne rastline",
    category: "Dom",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769287489/sobne-rastline_hnkotl.jpg", 
    description: "Ustvarite zeleno oazo v svojem domu. Pestra izbira listnatih in cvetočih sobnih rastlin, kaktusov ter sukulent."
  },
  {
    id: 4,
    name: "Grmičevje",
    category: "Urejanje",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769288298/IMG_4446_hqpmkw.jpg", 
    imagePosition: "object-[center_45%]",
    description: "Okrasno grmičevje za vsak vrt. Nudimo pestro izbiro sadik za oblikovanje živih mej ter raznolike samostojne okrasne grme.",
    galleryImages: [
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334091/IMG_7066_ewpawo.jpg",
        title: "Forsythia intermedia 'Weekend'",
        description: "Forsythia intermedia 'Weekend' je listopaden grm, ki je izjemno cenjen zaradi zgodnjega in obilnega cvetenja. Živo rumeni cvetovi se pojavijo še pred listi in popolnoma prekrijejo veje.",
        details: {
          height: "40 - 60 cm",
          maxHeight: "2.5 m",
          evergreen: false,
          exposure: "Polno sonce / Polsenca",
          water: "Redno",
          blooming: "Februar - Marec",
          potSize: "19 cm (V19)",
          leafShape: "Suličasta",
          leafColor: "Zelena",
          flowerColor: "Živo rumena",
          use: "Žive meje, obrobe, samostojni grm",
          minTemp: "-20°C",
          soil: "Rodovitna, dobro odcedna tla",
          pruning: "Po cvetenju"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334091/IMG_7068_beh30q.jpg",
        title: "Juniperus horizontalis 'Wiltonii'",
        description: "Juniperus horizontalis 'Wiltonii' je nizek, plazeč zimzelen iglavec, ki tvori gosto srebrno-modro preprogo. Je ena najboljših rastlin za prekrivanje tal, saj se tesno oprijema podlage.",
        details: {
          height: "15 - 20 cm",
          maxHeight: "0.5 m (širina do 2.5 m)",
          evergreen: true,
          exposure: "Polno sonce",
          water: "Zmerno",
          blooming: "Ni cvetov (iglavec)",
          potSize: "19 cm (V19)",
          leafShape: "Iglasta / Luskasta",
          leafColor: "Srebrno-modra",
          flowerColor: "/",
          use: "Prekrivanje tal, skalnjaki, brežine, grobovi",
          minTemp: "-20°C",
          soil: "Vse vrste tal, dobro odcedna",
          pruning: "Ni potrebno"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334090/IMG_7070_ip3xai.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/hydrangea-paniculata-vanille-fraise-R---Renhy-.jpg"],
        title: "Hydrangea paniculata 'Vanille Fraise' (Renhy)",
        description: "Listopadni grm iz družine hortenzij (Hydrangeaceae). Ima pokončno, dobro razvejano, prožno in razvejano rast. Doseže 2,5 metra v višino. Njegovi listi so temno zeleni, nazobčani in ovalni. Cvetovi se pojavljajo v piramidalnih latnatih socvetjih, ki so kremasto beli in postopoma postajajo temno rožnati. Priporočljiva so rodovitna tla.",
        details: {
          height: "30 cm",
          maxHeight: "250 cm",
          evergreen: false,
          exposure: "Polsenca",
          water: "Redno, obilno poleti",
          blooming: "Junij - September",
          potSize: "22 cm",
          leafShape: "Nazobčana, ovalna",
          leafColor: "Svetlo zelena",
          flowerColor: "Bela, temno rožnata",
          use: "Gredice",
          minTemp: "-10°C",
          soil: "Rodovitna",
          pruning: "September"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334090/IMG_7067_y4dgpf.jpg",
        title: "Kalistemon Laevis V19",
        description: "Zimzeleni grm iz družine mirtovk (Myrtaceae). Zaobljene oblike. Suličasti, trdi, temno zeleni listi. Njegovi značilni rdeči cvetovi v obliki valjastih klasov se pojavljajo od junija do septembra. Cveti večkrat. Znan je tudi kot \"čistilec steklenic\" zaradi cvetov v obliki čistilca steklenic. Najraje ima normalna, dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Mirtove",
          potSize: "19 cm",
          leafColor: "Temno zelena",
          blooming: "Junij - September",
          evergreen: true,
          height: "30/35 cm",
          leafShape: "Suličast",
          flowerColor: "Škrlatno rdeča",
          use: "Gredica",
          exposure: "Sonce",
          soil: "Odcedna, rodovitna",
          pruning: "Oktober",
          maxHeight: "300 cm",
          minTemp: "0°C",
          water: "Malo"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334090/IMG_7069_i20fe0.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/berberis-th.-harlequin.jpg-+-piccola.jpg"],
        title: "Berberis Thunbergii Harlequin V19",
        description: "Listopadni grm iz družine češminovk (Berberidaceae). Široke rasti, doseže maksimalno višino okoli 90 cm. Značilni so bordo rdeči in beli listi ter bledo rumeni cvetovi spomladi. Idealen za grede in skupinske zasaditve, pa tudi kot samostojna rastlina. Uspeva v normalnih, rodovitnih in dobro odcednih tleh.",
        details: {
          plantType: "Grm",
          family: "Češminovke (Berberidaceae)",
          potSize: "19 cm",
          leafColor: "Bordo rdeča, belo pisana",
          blooming: "April, maj",
          evergreen: false,
          height: "25/30 cm",
          leafShape: "Okrogla",
          flowerColor: "Rumena",
          use: "Gredica, skalnjak, živa meja",
          exposure: "Polsenca",
          soil: "Rodovitna",
          pruning: "Februar",
          maxHeight: "90 cm",
          minTemp: "-20°C",
          water: "Redno"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334089/IMG_7071_m1yrje.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/buddleja-davidii-pink-dettaglio-000236.jpg"],
        title: "Buddleja Davidii Pink Delight V19 (Metuljnik)",
        description: "Listopadni grm iz družine metuljnikovk (Buddlejaceae). Močan grm s pokončno rastjo, ki doseže maksimalno višino 300 cm. Cveti od julija do septembra. Imenujemo ga tudi 'metuljnik', saj med cvetenjem oddaja čudovit vonj, ki privablja številne metulje in žuželke. Rožnati cvetovi so združeni v latasta socvetja. Uspeva v rodovitnih tleh.",
        details: {
          plantType: "Grm",
          family: "Buddlejaceae",
          potSize: "19 cm",
          leafColor: "Svetlo zelena",
          blooming: "Junij, Julij, Avgust, September",
          evergreen: false,
          height: "40/50 cm",
          leafShape: "Suličasta",
          flowerColor: "Rožnata",
          use: "Gredica",
          exposure: "Sonce",
          soil: "Rodovitna",
          pruning: "Marec",
          maxHeight: "300 cm",
          minTemp: "-20°C",
          water: "Redno"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334088/IMG_7074_vdivon.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/juniperus-hor-blue-chip.jpg-+-piccola.jpg"],
        title: "Juniperus horizontalis Blue Chip V19 (Brin)",
        description: "Zimzeleni iglavec iz družine cipresovk (Cupressaceae). Ima plazečo se, razpotegnjeno, talno pokrivajočo rast. Doseže 20 cm v višino. Njegovi igličasti listi so intenzivne srebrno modre barve. Idealen za skalnjake in sadilnike. Najraje ima rodovitna, dobro odcedna tla.",
        details: {
          plantType: "Iglavec",
          family: "Cipresovke (Cupressaceae)",
          potSize: "19 cm",
          diameter: "25/30 cm",
          leafColor: "Modra, srebrna",
          evergreen: true,
          leafShape: "Igličast",
          use: "Gredica, skalnata",
          exposure: "Sonce",
          soil: "Odcedna, rodovitna",
          maxHeight: "20 cm",
          minTemp: "-30°C",
          water: "Redno"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334088/IMG_7072_cifyoj.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/azalea-769531-1920.jpg"],
        title: "Azaleja Encore Sweetheart ® V19 - ponovno cvetenje -",
        description: "Zimzeleni grm iz družine Ericaceae. Kompakten, srednje hitro rastoči, do 100 cm visok. Majhni, suličasti, svetlo zeleni listi. Obilno, živo obarvano cveti spomladi, poleti in jeseni z globoko rožnatimi poldvojnimi cvetovi. Najraje ima kisla tla.",
        details: {
          plantType: "Grm",
          family: "Vresovke",
          diameter: "30/35 cm",
          potSize: "19 cm",
          leafColor: "Sijajno zelena",
          blooming: "April, maj",
          evergreen: true,
          leafShape: "Suličast",
          flowerColor: "Vrtnica",
          use: "Gredica, skalnata",
          exposure: "Polsenca",
          soil: "Kislina, odcejena",
          pruning: "April",
          maxHeight: "100 cm",
          minTemp: "-20°C",
          water: "Redno"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334088/IMG_7073_w6wqha.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/juniperus-procubens-nana-dettaglio-015186.jpg"],
        title: "Juniperus Procubens Nana V19 (brin)",
        description: "Zimzeleni iglavec iz družine Cupressaceae. Ima plazečo se, razpotegnjeno, talno pokrivajočo rast. Doseže 40 cm v višino. Njegovi igličasti, koničasti, sivozeleni listi so idealni za skalnjake in sadilnike. Najraje ima rodovitna, dobro odcedna tla.",
        details: {
          plantType: "Iglavec",
          family: "Cupressaceae",
          diameter: "40/45 cm",
          potSize: "19 cm",
          leafColor: "Zelena, sivkasta",
          evergreen: true,
          leafShape: "Igličast",
          use: "Gredica, skalnata",
          exposure: "Sonce",
          soil: "Odcedna, rodovitna",
          maxHeight: "40 cm",
          minTemp: "-30°C",
          water: "Redno"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334088/IMG_7075_m17psj.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/nerium-oleander.jpg"],
        title: "Nerium Oleander V19 - mešani - (oleander)",
        description: "Zimzeleni grm iz družine Apocynaceae. Ima košato, pokončno rastno obliko, ki se pri dnu razveja. Doseže 6 metrov v višino. Njegovi listi so usnjati, suličasti, sijoči in koničasti. Njegovi posamezni, lijakasti cvetovi pozno spomladi tvorijo šopke in so rožnate, rumene, bele ali rdeče barve, odvisno od sorte. Najraje ima rodovitna, dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Apocinaceae",
          potSize: "19 cm",
          leafColor: "Zelena",
          blooming: "Avgust, junij, julij, maj, september",
          evergreen: true,
          height: "50/70 cm",
          leafShape: "Suličast",
          flowerColor: "Roza, rdeča, rumena, bela",
          use: "Gredica, živa meja, samotno",
          exposure: "Sonce",
          soil: "Plodna",
          pruning: "Oktober, september",
          maxHeight: "600 cm",
          minTemp: "-5°C",
          water: "Redno"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334087/IMG_7076_chpvbw.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/loropetalum-chinensis-black-dettaglio-000741.jpg"],
        title: "Črni biser Loropetalum Chinensis ® V19",
        description: "Zimzeleni grm iz družine Hamamelidaceae. Zanj so značilna pokončna stebla in veje, ki večinoma rastejo vodoravno, v le nekaj letih pa lahko doseže 1,5 metra višine. Njegovi listi so majhni, ovalni in temno rdeči, skoraj črni. Njegovi vijolični cvetovi začnejo cveteti aprila in cvetijo do jeseni. Idealen je za popestritev vrta, saj ga lahko uporabljate kot posamezno rastlino, v mešanih živih mejah in na obrobah. Najraje ima hladna, rodovitna in dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Hamamelidae",
          diameter: "25/30 cm",
          potSize: "19 cm",
          leafColor: "Temno rdeča",
          blooming: "Avgust, april, junij, julij, maj, september",
          evergreen: true,
          leafShape: "Ovalna",
          flowerColor: "Roza, vijolična",
          use: "Gredica, obroba",
          exposure: "Sonce",
          soil: "Odcedna, rodovitna",
          pruning: "September",
          maxHeight: "150 cm",
          minTemp: "-20°C",
          water: "Nizko povpraševanje"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334087/IMG_7077_gitdob.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/nandina-domestica-blush-pink-R---Aka-.jpg"],
        title: "Nandina Domestica Roza Blush ® V19",
        description: "Zimzeleni grm iz družine Berberidaceae. Ima košato, gosto in izjemno dekorativno rast. Počasi raste in doseže 1,2 metra v višino. Suličasti listi so živo rožnati, preden postanejo zeleni, jeseni pa rdeči. Majhni, beli cvetovi zacvetijo pozimi in se spremenijo v spektakularne grozde rdečih jagod. Priporočljiva so rodovitna, dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Češnjake",
          diameter: "30/35 cm",
          potSize: "19 cm",
          leafColor: "Svetlo roza",
          blooming: "April, maj",
          evergreen: true,
          leafShape: "Suličast",
          flowerColor: "Bela",
          use: "Meja, pokrovnost tal",
          exposure: "Polsenca, sonce",
          soil: "Odcejena",
          pruning: "Junij, julij",
          maxHeight: "120 cm",
          minTemp: "-20°C",
          water: "Redno"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334086/IMG_7083_nibscl.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/Berberis-Frikartii-Amstelveen--dettaglio-V19-000203.jpg"],
        title: "Berberis Frikartii Amstelveen V19",
        description: "Zimzeleni grm iz družine Berberidaceae. Ima povešeno rast z pravilno kupolasto obliko, gosto s prepletenimi, trnastimi vejami. Doseže 80 cm v višino. Njegovi podolgovati, sijoči temno zeleni listi so na spodnji strani beli. V aprilu in maju cveti rumeno. Najraje ima rodovitna, dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Češnjake",
          diameter: "25/30 cm",
          potSize: "19 cm",
          leafColor: "Bleščeča temno zelena, bela",
          blooming: "April, maj",
          evergreen: true,
          leafShape: "Krožišče",
          flowerColor: "Rumena",
          use: "Gredica, skalnjak, živa meja",
          exposure: "Polsenca",
          soil: "Plodna",
          pruning: "Junij",
          maxHeight: "80 cm",
          minTemp: "-20°C",
          water: "Redno"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334086/IMG_7078_pswymx.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/cornus-alba-sibirica-dettaglio-000356.jpg"],
        title: "Cornus Alba Sibirica Variegata V19 (Sibirski kornus)",
        description: "Listopadni grm iz družine Cornaceae. Ima elegantno, pokončno in urejeno rastno obliko, ki doseže 2,5 metra v višino. Njegov značilen, pozimi živo rdeč les naredi veje zelo razkošne. Ovalni, zeleni listi z belimi pisanimi robovi, ki jeseni postanejo rdeči. Dišeči beli cvetovi maja in junija. Obrodi mesnate jagode, bogate z vitaminom C. Priporočljiva so rodovitna tla.",
        details: {
          plantType: "Grm",
          family: "Koruza",
          height: "40/50 cm",
          diameter: "-",
          potSize: "19 cm",
          leafColor: "Zelena z belim robom, jeseni rdeča",
          blooming: "Junij, maj",
          evergreen: false,
          leafShape: "Eliptična, jajčasta",
          flowerColor: "Bela",
          use: "Gredica, samotna",
          exposure: "Polsenca, sonce",
          soil: "Plodna",
          pruning: "Marec, oktober",
          maxHeight: "250 cm",
          minTemp: "-30°C",
          water: "Redno obilno spomladi in poleti",
          trunk: "-"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334086/IMG_7080_mxg6i8.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/ilex-altaclarensis-golden-dettaglio-000550.jpg"],
        title: "Ilex Altaclarensis Golden King V19 (bodika)",
        description: "Zimzeleni grm iz družine Aquifoliaceae. Ima košato, gosto, piramidasto obliko in počasi raste. Doseže 3 metre v višino. Njegovi listi so rahlo bodičasti, zeleni in razkošno pisani z živo rumenim robom. Jeseni ima majhne, bele cvetove. Najraje ima kisla, dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Aquifoliaceae",
          height: "30/40 cm",
          diameter: "-",
          potSize: "19 cm",
          leafColor: "Svetlo rumeno obrobljeno zeleno",
          blooming: "December, november, oktober, september",
          evergreen: true,
          leafShape: "Eliptična, jajčasta",
          flowerColor: "Mat bela",
          use: "Gredica, samotna",
          exposure: "Polsenca",
          soil: "Kislina, odcejena",
          pruning: "Februar, marec",
          maxHeight: "300 cm",
          minTemp: "-20°C",
          water: "Redno",
          trunk: "-"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334085/IMG_7079_bkbzjq.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/viburnum-opulus-roseum-det.jpg"],
        title: "Viburnum Opulus Roseum V19 (viburnum)",
        description: "Listopadni grm iz družine Caprifoliaceae. Ima košato, kompaktno, zaobljeno obliko. Doseže 3,5 metra v višino. Ima trikrpične, temno zelene liste, ki se jeseni obarvajo vijolično. Dišeči, beli cvetovi, ki se obarvajo rožnato, so združeni v velike snežne kepe. Cveti pozno spomladi. Najraje ima hladna, rodovitna in dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Kaprifolistične",
          height: "40/50 cm",
          diameter: "-",
          potSize: "19 cm",
          leafColor: "Zelena",
          blooming: "April, maj",
          evergreen: false,
          leafShape: "Zobat, krpast",
          flowerColor: "Bela",
          use: "Gredica, živa meja",
          exposure: "Polsenca",
          soil: "Odcejena",
          pruning: "Junij",
          maxHeight: "350 cm",
          minTemp: "-30°C",
          water: "Redno",
          trunk: "-"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334085/IMG_7081_wcihtj.jpg",
        additionalUrls: ["https://www.bessicapiante.it/pics/catalogo/osmanthus-goshiki.jpg"],
        title: "Osmanthus Heterophillus Goshiki (tribarvni) V19 (tribarvni osmantus)",
        description: "Zimzeleni grm iz družine oljk (Oleaceae). Ima gosto in kompaktno rast, je izjemno pritlikava, okrogla in počasi rastoča. Doseže 1,5 metra v višino. Njeni listi so pisani v zeleni, kremni, roza in oranžni barvi. So ovalni, globoko nazobčani in usnjati. Jeseni pocveti z majhnimi, dišečimi belimi cvetovi. Odličen za žive meje. Najraje ima rodovitna, dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Oljne",
          height: "35/40 cm",
          diameter: "-",
          potSize: "19 cm",
          leafColor: "Bleščeče zelene barve z rumenimi, rožnatimi in oranžnimi robovi",
          blooming: "November, oktober",
          evergreen: true,
          leafShape: "Podolgovat",
          flowerColor: "Bela",
          use: "Gredica, obroba, skalnjak",
          exposure: "Sonce",
          soil: "Odcejena",
          pruning: "Februar, junij, marec",
          maxHeight: "150 cm",
          minTemp: "-20°C",
          water: "Redno",
          trunk: "-"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334085/IMG_7082_j41r4r.jpg",
        title: "Euonymus Fortunei Emerald'n Gold V19 (evonim)",
        description: "Zimzeleni grm iz družine trdoleskovk (Celastraceae). Ima plazečo se, razpotegnjeno rast. Največja višina 25 cm. Ovalni, zeleni listi, ki so poleti rumeni, jeseni pa bronasti. Jeseni obrodi oranžne jagode. Najraje ima rodovitna, dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Celastraceae",
          height: "30/35 cm",
          diameter: "20/25 cm",
          potSize: "19 cm",
          leafColor: "Zelena, zlata, bronasta jeseni",
          blooming: "-",
          evergreen: true,
          leafShape: "Eliptični",
          flowerColor: "-",
          use: "Gredica, skalnjak, pokrovnost tal",
          exposure: "Polsenca",
          soil: "Odcedna, rodovitna",
          pruning: "Julij, marec",
          maxHeight: "25 cm",
          minTemp: "-20°C",
          water: "Redno",
          trunk: "-"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334083/IMG_7093_ohvxva.jpg",
        additionalUrls: [
          "https://www.bessicapiante.it/pics/catalogo/juniperus-squamata-blue-dettaglio-015188.jpg",
          "https://www.bessicapiante.it/pics/catalogo/juniperus-procubens-nana_3.jpg-+-piccola_3.jpg"
        ],
        title: "Juniperus Squamata Blue Star V19 (brin)",
        description: "Zimzeleni iglavec iz družine Cupressaceae. V mladosti je gost in kompakten, s staranjem pa postane okrogel in nepravilne oblike. Počasi raste in doseže največjo višino 90-100 cm v povprečju v 10-20 letih. Listje je zelo svetlo modre barve. Uporablja se kot pokrovna rastlina v gredicah in skalnjakih. Najraje ima rodovitna, dobro odcedna tla.",
        details: {
          plantType: "Iglavec",
          family: "Cupressaceae",
          height: "-",
          diameter: "25/30 cm",
          potSize: "19 cm",
          leafColor: "Modra",
          blooming: "-",
          evergreen: true,
          leafShape: "Igličast",
          flowerColor: "-",
          use: "Gredica, skalnata",
          exposure: "Sonce",
          soil: "Odcedna, rodovitna",
          pruning: "-",
          maxHeight: "90 cm",
          minTemp: "-30°C",
          water: "Redno",
          trunk: "-"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334083/IMG_7092_xdw9ao.jpg",
        additionalUrls: [
          "https://www.bessicapiante.it/pics/catalogo/photinia-fraseri-red-dettaglio.jpg"
        ],
        title: "Photinia Fraseri Red Robin V19 (fotinija)",
        description: "Zimzeleni grm iz družine rožnic (Rosaceae). Ima kompakten, pokončen, grmast videz in hitro rast. Doseže višino 6 metrov. Njegovo sijoče listje je poleti in pozimi zeleno. Mlade poganjke spomladi in jeseni so čudovite, temno, živo rdeče barve. Cvetovi pozno spomladi so majhni in beli, združeni v velika socvetja. Idealen za žive meje, lahko pa se uporablja tudi kot samostojna rastlina ali v mešani gredici. Zahteva dobro odcedna tla.",
        details: {
          plantType: "Grm",
          family: "Rosaceae",
          height: "90/120 cm",
          diameter: "-",
          potSize: "19 cm",
          leafColor: "Zelena, v mladosti živo rdeča",
          blooming: "Junij, maj",
          evergreen: true,
          leafShape: "Suličast",
          flowerColor: "Bela",
          use: "Živa meja",
          exposure: "Sonce",
          soil: "Odcejena",
          pruning: "Junij, julij",
          maxHeight: "600 cm",
          minTemp: "-15°C",
          water: "Redno",
          trunk: "-"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334083/IMG_7096_ait94q.jpg",
        additionalUrls: [
          "https://www.bessicapiante.it/pics/catalogo/eucalyptus-gunni-azura-det.jpg"
        ],
        title: "Evkaliptus Gunnii",
        description: "Zimzeleni grm iz družine mirtovk (Myrtaceae). Počasi rastoči in kompaktni, doseže največ 10+ metrov višine. Ima lepo, zaobljeno listje, ki se razlikuje od srebrne do turkizne barve. Šopki belih cvetov se pojavijo aprila in maja. Idealen kot posamezna rastlina. Najraje ima rodovitna, dobro odcedna tla. Dobra odpornost na mraz, do -20°C.",
        details: {
          plantType: "Grm",
          family: "Mirtove",
          height: "50 cm",
          diameter: "-",
          potSize: "30 cm ali 19 cm",
          leafColor: "Srebrno-turkizna",
          blooming: "April, maj",
          evergreen: true,
          leafShape: "Suličaste, okrogle",
          flowerColor: "Bela",
          use: "Gredica, samotna",
          exposure: "Sonce",
          soil: "Odcedna, rodovitna",
          pruning: "Junij",
          maxHeight: "10+ m",
          minTemp: "-20°C",
          water: "Redno",
          trunk: "-"
        }
      },
      {
        url: "https://res.cloudinary.com/dbgh78brl/image/upload/v1773334083/IMG_7091_esdmpg.jpg",
        additionalUrls: [
          "https://www.bessicapiante.it/pics/catalogo/013916-dettaglio.jpg"
        ],
        title: "Japonska aukuba (Crotonifolia) V19",
        description: "Zimzeleni grm iz družine Cornaceae. Gosta, zaobljena rast s svetlo zelenimi vejami in stebli. Največja višina 2,5 metra. Veliki, usnjati, sijoči, svetlo zeleni listi z rumenimi progami. Majhni, temno rdeči latnati cvetovi se pojavijo spomladi, jeseni pa jim sledijo razkošni rdeči plodovi, ki ostanejo do pomladi, le na ženskih primerkih. Najraje ima peščena in glinena tla.",
        details: {
          plantType: "Grm",
          family: "Koruza",
          height: "30/35 cm",
          diameter: "-",
          potSize: "19 cm",
          leafColor: "Zelena pikasta rumena",
          blooming: "April, marec",
          evergreen: true,
          leafShape: "Zobati, jajčasti",
          flowerColor: "Temno rdeča",
          use: "Gredica, živa meja",
          exposure: "Polsenca, senca, sonce",
          soil: "Glinasta, peščena",
          pruning: "April, februar, marec",
          maxHeight: "250 cm",
          minTemp: "-20°C",
          water: "Redno",
          trunk: "-"
        }
      }
    ]
  },
  {
    id: 5,
    name: "Gnojila in Substrati",
    category: "Nega & Rast",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769290355/IMG_2825_dyd926.jpg",
    imagePosition: "object-[center_60%]",
    description: "Vse za zdravo rast. Visokokakovostni substrati Triplo in profesionalna gnojila Venagro za optimalno vitalnost vaših rastlin."
  },
  {
    id: 6,
    name: "Okrasni lonci",
    category: "Dodatki",
    image: "https://res.cloudinary.com/dbgh78brl/image/upload/f_auto,q_auto/v1769288878/IMG_2824_vazlyr.jpg",
    imagePosition: "object-[center_85%]",
    description: "Širok izbor modernih okrasnih loncev poljske znamke Form Plastic različnih oblik in barv za popestritev vašega ambienta."
  }
];

interface CatalogProps {
  onSelectCategory?: (category: Category) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onSelectCategory }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.01, 
        rootMargin: "-50px" 
      } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (index: number) => {
    const baseClass = "transition-all duration-[1500ms] ease-out";
    
    if (isVisible) {
      return `${baseClass} opacity-100 translate-x-0 translate-y-0`;
    }

    const mobileHidden = "opacity-0 translate-y-20";
    
    let desktopHidden = "";
    if (index % 3 === 0) desktopHidden = "md:-translate-x-24 md:translate-y-0"; 
    else if (index % 3 === 1) desktopHidden = "md:translate-y-24 md:translate-x-0"; 
    else desktopHidden = "md:translate-x-24 md:translate-y-0"; 

    return `${baseClass} ${mobileHidden} ${desktopHidden}`;
  };

  return (
    <section id="catalog" className="py-20 bg-white overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-nature-600 font-semibold tracking-wide uppercase text-sm mb-2">Naša zbirka</h2>
          <h3 className="text-5xl font-serif font-bold text-nature-900 mb-6">NAŠA PONUDBA</h3>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Z nami bo vaš vrt cvetel! Kliknite na kategorijo za ogled podrobnosti in galerije.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => onSelectCategory && onSelectCategory(item)}
              className={`group bg-nature-50/30 rounded-2xl overflow-hidden hover:shadow-xl border border-nature-100 flex flex-col cursor-pointer hover:-translate-y-2 ${getAnimationClass(index)}`}
              style={{ transitionDelay: `${index * 250}ms` }} 
            >
              <div className="relative h-64 overflow-hidden">
                {item.video ? (
                  <video 
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${item.imagePosition || 'object-center'}`}
                  />
                )}
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-nature-800 shadow-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-2xl font-serif font-bold text-gray-800 group-hover:text-nature-700 transition-colors">{item.name}</h4>
                </div>
                <p className="text-gray-500 text-sm flex-1 leading-relaxed">{item.description}</p>
                <div className="mt-4 pt-4 border-t border-nature-100/50 flex justify-between items-center">
                    <span className="text-xs text-nature-600 font-medium bg-nature-100 px-3 py-1.5 rounded-full">Oglej si galerijo</span>
                    <span className="text-nature-400 text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Vrtnarstvo+Koršič+Ščedne+6+Nova+Gorica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-nature-800 text-white px-8 py-3 rounded-full hover:bg-nature-700 transition-colors shadow-lg shadow-nature-800/20 font-medium"
          >
            Obiščite nas
          </a>
        </div>
      </div>
    </section>
  );
};