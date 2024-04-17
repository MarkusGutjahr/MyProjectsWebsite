PGDMP                          {            Pflegedienst    15.1    15.1 X    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16905    Pflegedienst    DATABASE     �   CREATE DATABASE "Pflegedienst" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'German_Germany.1252';
    DROP DATABASE "Pflegedienst";
                postgres    false            �            1259    31015 
   abrechnung    TABLE     q   CREATE TABLE public.abrechnung (
    anr integer NOT NULL,
    a_datum date,
    a_gesamtkosten numeric(10,2)
);
    DROP TABLE public.abrechnung;
       public         heap    postgres    false            �            1259    31020    abrechnungspos    TABLE     }   CREATE TABLE public.abrechnungspos (
    apos integer NOT NULL,
    ap_anr integer NOT NULL,
    ap_penr integer NOT NULL
);
 "   DROP TABLE public.abrechnungspos;
       public         heap    postgres    false            �            1259    31000    pflegeeinsatz    TABLE     �   CREATE TABLE public.pflegeeinsatz (
    penr integer NOT NULL,
    pe_tpos integer,
    pe_mnr integer,
    pe_pnr integer,
    pe_plnr integer,
    pe_datum date,
    pe_beginn time without time zone,
    pe_ende time without time zone
);
 !   DROP TABLE public.pflegeeinsatz;
       public         heap    postgres    false            �            1259    30880    pflegeleistungen    TABLE     �   CREATE TABLE public.pflegeleistungen (
    plnr integer NOT NULL,
    pl_knr integer,
    pl_name character varying(50),
    pl_dauer time without time zone
);
 $   DROP TABLE public.pflegeleistungen;
       public         heap    postgres    false            �            1259    31061    anzansprgenomm    VIEW     �   CREATE VIEW public.anzansprgenomm AS
 SELECT pl.pl_name AS plname,
    count(pe.pe_plnr) AS haeufigkeit
   FROM (public.pflegeleistungen pl
     JOIN public.pflegeeinsatz pe ON ((pl.plnr = pe.pe_plnr)))
  GROUP BY pl.pl_name;
 !   DROP VIEW public.anzansprgenomm;
       public          postgres    false    217    217    230            �            1259    31035 
   evaluation    TABLE     �   CREATE TABLE public.evaluation (
    enr integer NOT NULL,
    e_eknr integer,
    e_mnr integer,
    e_pnr integer,
    e_penr integer,
    e_bewertung numeric(3,0)
);
    DROP TABLE public.evaluation;
       public         heap    postgres    false            �            1259    30930    evaluationskatalog    TABLE     r   CREATE TABLE public.evaluationskatalog (
    eknr integer NOT NULL,
    ek_beschreibung character varying(100)
);
 &   DROP TABLE public.evaluationskatalog;
       public         heap    postgres    false            �            1259    31065    avgbew    VIEW     �   CREATE VIEW public.avgbew AS
 SELECT avg(e.e_bewertung) AS avgbewertung,
    ek.ek_beschreibung AS schlechtebewertung
   FROM (public.evaluationskatalog ek
     JOIN public.evaluation e ON ((ek.eknr = e.e_eknr)))
  GROUP BY ek.ek_beschreibung;
    DROP VIEW public.avgbew;
       public          postgres    false    233    233    222    222            �            1259    30940    mitarbeiter    TABLE       CREATE TABLE public.mitarbeiter (
    mnr integer NOT NULL,
    m_name character varying(30),
    m_vorname character varying(30),
    m_geburtsdatum date,
    m_anschrift character varying(100),
    m_plz numeric(5,0),
    m_stadt character varying(40)
);
    DROP TABLE public.mitarbeiter;
       public         heap    postgres    false            �            1259    30965    patient    TABLE     x  CREATE TABLE public.patient (
    pnr integer NOT NULL,
    pat_knr integer,
    pat_name character varying(30),
    pat_vorname character varying(30),
    pat_geburtsdatum date,
    pat_anschrift character varying(100),
    pat_plz numeric(5,0),
    pat_stadt character varying(40),
    pat_versichertennr character varying(30),
    pat_angehoerige character varying(200)
);
    DROP TABLE public.patient;
       public         heap    postgres    false            �            1259    30975    tourenplanung    TABLE     �   CREATE TABLE public.tourenplanung (
    t_mnr integer NOT NULL,
    t_datum date NOT NULL,
    t_dauer time without time zone,
    t_laenge numeric(4,1)
);
 !   DROP TABLE public.tourenplanung;
       public         heap    postgres    false            �            1259    30985 	   tourenpos    TABLE     �   CREATE TABLE public.tourenpos (
    tpos integer NOT NULL,
    tp_mnr integer NOT NULL,
    tp_pnr integer NOT NULL,
    tp_datum date NOT NULL
);
    DROP TABLE public.tourenpos;
       public         heap    postgres    false            �            1259    31069 	   einsdauer    VIEW     �  CREATE VIEW public.einsdauer AS
 SELECT (pe.pe_ende - pe.pe_beginn) AS dauer,
    m.m_name,
    m.m_vorname,
    pat.pat_name,
    pat.pat_vorname
   FROM ((((public.mitarbeiter m
     JOIN public.tourenplanung t ON ((m.mnr = t.t_mnr)))
     JOIN public.tourenpos tp ON ((t.t_mnr = tp.tp_mnr)))
     JOIN public.patient pat ON ((tp.tp_pnr = pat.pnr)))
     JOIN public.pflegeeinsatz pe ON ((tp.tpos = pe.pe_tpos)));
    DROP VIEW public.einsdauer;
       public          postgres    false    230    230    230    224    229    229    229    228    227    227    227    224    224            �            1259    30855 
   erkrankung    TABLE     c   CREATE TABLE public.erkrankung (
    erknr integer NOT NULL,
    erk_name character varying(50)
);
    DROP TABLE public.erkrankung;
       public         heap    postgres    false            �            1259    30950    fahrzeugvergabe    TABLE     w   CREATE TABLE public.fahrzeugvergabe (
    fg_kennzeichen character varying(8) NOT NULL,
    fg_mnr integer NOT NULL
);
 #   DROP TABLE public.fahrzeugvergabe;
       public         heap    postgres    false            �            1259    30935    firmenfahrzeug    TABLE     �   CREATE TABLE public.firmenfahrzeug (
    kennzeichen character varying(8) NOT NULL,
    f_kilometerstand numeric(7,1),
    f_tuev date,
    f_reparaturen character varying(200)
);
 "   DROP TABLE public.firmenfahrzeug;
       public         heap    postgres    false            �            1259    30945    krankenkasse    TABLE     �   CREATE TABLE public.krankenkasse (
    knr integer NOT NULL,
    k_name character varying(30),
    k_art character varying(20)
);
     DROP TABLE public.krankenkasse;
       public         heap    postgres    false            �            1259    30865    krankheitsfall    TABLE     �   CREATE TABLE public.krankheitsfall (
    knr integer NOT NULL,
    k_erknr integer,
    k_symnr integer,
    k_staerke character varying(20)
);
 "   DROP TABLE public.krankheitsfall;
       public         heap    postgres    false            �            1259    30890    materialien    TABLE     �   CREATE TABLE public.materialien (
    matnr integer NOT NULL,
    mat_name character varying(50),
    mat_preis numeric(10,2),
    mat_menge integer
);
    DROP TABLE public.materialien;
       public         heap    postgres    false            �            1259    30900    materialpos    TABLE     �   CREATE TABLE public.materialpos (
    matpos integer NOT NULL,
    map_matnr integer NOT NULL,
    map_plnr integer NOT NULL,
    map_menge integer
);
    DROP TABLE public.materialpos;
       public         heap    postgres    false            �            1259    30895    medizin    TABLE     �   CREATE TABLE public.medizin (
    mednr integer NOT NULL,
    med_name character varying(50),
    med_preis numeric(10,2),
    med_inhaltsmenge integer
);
    DROP TABLE public.medizin;
       public         heap    postgres    false            �            1259    30915 
   medizinpos    TABLE     �   CREATE TABLE public.medizinpos (
    medpos integer NOT NULL,
    mep_mednr integer NOT NULL,
    mep_plnr integer NOT NULL,
    mep_menge integer
);
    DROP TABLE public.medizinpos;
       public         heap    postgres    false            �            1259    30860    symptome    TABLE     a   CREATE TABLE public.symptome (
    symnr integer NOT NULL,
    sym_name character varying(50)
);
    DROP TABLE public.symptome;
       public         heap    postgres    false            �          0    31015 
   abrechnung 
   TABLE DATA           B   COPY public.abrechnung (anr, a_datum, a_gesamtkosten) FROM stdin;
    public          postgres    false    231   =o       �          0    31020    abrechnungspos 
   TABLE DATA           ?   COPY public.abrechnungspos (apos, ap_anr, ap_penr) FROM stdin;
    public          postgres    false    232   �o       �          0    30855 
   erkrankung 
   TABLE DATA           5   COPY public.erkrankung (erknr, erk_name) FROM stdin;
    public          postgres    false    214   �o       �          0    31035 
   evaluation 
   TABLE DATA           T   COPY public.evaluation (enr, e_eknr, e_mnr, e_pnr, e_penr, e_bewertung) FROM stdin;
    public          postgres    false    233   np       �          0    30930    evaluationskatalog 
   TABLE DATA           C   COPY public.evaluationskatalog (eknr, ek_beschreibung) FROM stdin;
    public          postgres    false    222   �p       �          0    30950    fahrzeugvergabe 
   TABLE DATA           A   COPY public.fahrzeugvergabe (fg_kennzeichen, fg_mnr) FROM stdin;
    public          postgres    false    226   �p       �          0    30935    firmenfahrzeug 
   TABLE DATA           ^   COPY public.firmenfahrzeug (kennzeichen, f_kilometerstand, f_tuev, f_reparaturen) FROM stdin;
    public          postgres    false    223   ;q       �          0    30945    krankenkasse 
   TABLE DATA           :   COPY public.krankenkasse (knr, k_name, k_art) FROM stdin;
    public          postgres    false    225   �q       �          0    30865    krankheitsfall 
   TABLE DATA           J   COPY public.krankheitsfall (knr, k_erknr, k_symnr, k_staerke) FROM stdin;
    public          postgres    false    216   1r       �          0    30890    materialien 
   TABLE DATA           L   COPY public.materialien (matnr, mat_name, mat_preis, mat_menge) FROM stdin;
    public          postgres    false    218   �r       �          0    30900    materialpos 
   TABLE DATA           M   COPY public.materialpos (matpos, map_matnr, map_plnr, map_menge) FROM stdin;
    public          postgres    false    220   js       �          0    30895    medizin 
   TABLE DATA           O   COPY public.medizin (mednr, med_name, med_preis, med_inhaltsmenge) FROM stdin;
    public          postgres    false    219   �s       �          0    30915 
   medizinpos 
   TABLE DATA           L   COPY public.medizinpos (medpos, mep_mednr, mep_plnr, mep_menge) FROM stdin;
    public          postgres    false    221   )t       �          0    30940    mitarbeiter 
   TABLE DATA           j   COPY public.mitarbeiter (mnr, m_name, m_vorname, m_geburtsdatum, m_anschrift, m_plz, m_stadt) FROM stdin;
    public          postgres    false    224   Rt       �          0    30965    patient 
   TABLE DATA           �   COPY public.patient (pnr, pat_knr, pat_name, pat_vorname, pat_geburtsdatum, pat_anschrift, pat_plz, pat_stadt, pat_versichertennr, pat_angehoerige) FROM stdin;
    public          postgres    false    227   ou       �          0    31000    pflegeeinsatz 
   TABLE DATA           m   COPY public.pflegeeinsatz (penr, pe_tpos, pe_mnr, pe_pnr, pe_plnr, pe_datum, pe_beginn, pe_ende) FROM stdin;
    public          postgres    false    230   �v       �          0    30880    pflegeleistungen 
   TABLE DATA           K   COPY public.pflegeleistungen (plnr, pl_knr, pl_name, pl_dauer) FROM stdin;
    public          postgres    false    217   �w       �          0    30860    symptome 
   TABLE DATA           3   COPY public.symptome (symnr, sym_name) FROM stdin;
    public          postgres    false    215   x       �          0    30975    tourenplanung 
   TABLE DATA           J   COPY public.tourenplanung (t_mnr, t_datum, t_dauer, t_laenge) FROM stdin;
    public          postgres    false    228   �x       �          0    30985 	   tourenpos 
   TABLE DATA           C   COPY public.tourenpos (tpos, tp_mnr, tp_pnr, tp_datum) FROM stdin;
    public          postgres    false    229   6y       �           2606    31019    abrechnung pkabrechnung 
   CONSTRAINT     V   ALTER TABLE ONLY public.abrechnung
    ADD CONSTRAINT pkabrechnung PRIMARY KEY (anr);
 A   ALTER TABLE ONLY public.abrechnung DROP CONSTRAINT pkabrechnung;
       public            postgres    false    231            �           2606    31024    abrechnungspos pkabrechnungspos 
   CONSTRAINT     p   ALTER TABLE ONLY public.abrechnungspos
    ADD CONSTRAINT pkabrechnungspos PRIMARY KEY (apos, ap_anr, ap_penr);
 I   ALTER TABLE ONLY public.abrechnungspos DROP CONSTRAINT pkabrechnungspos;
       public            postgres    false    232    232    232            �           2606    30859    erkrankung pkerkrankung 
   CONSTRAINT     X   ALTER TABLE ONLY public.erkrankung
    ADD CONSTRAINT pkerkrankung PRIMARY KEY (erknr);
 A   ALTER TABLE ONLY public.erkrankung DROP CONSTRAINT pkerkrankung;
       public            postgres    false    214            �           2606    31039    evaluation pkevaluation 
   CONSTRAINT     V   ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT pkevaluation PRIMARY KEY (enr);
 A   ALTER TABLE ONLY public.evaluation DROP CONSTRAINT pkevaluation;
       public            postgres    false    233            �           2606    30934 '   evaluationskatalog pkevaluationskatalog 
   CONSTRAINT     g   ALTER TABLE ONLY public.evaluationskatalog
    ADD CONSTRAINT pkevaluationskatalog PRIMARY KEY (eknr);
 Q   ALTER TABLE ONLY public.evaluationskatalog DROP CONSTRAINT pkevaluationskatalog;
       public            postgres    false    222            �           2606    30954 !   fahrzeugvergabe pkfahrzeugvergabe 
   CONSTRAINT     s   ALTER TABLE ONLY public.fahrzeugvergabe
    ADD CONSTRAINT pkfahrzeugvergabe PRIMARY KEY (fg_kennzeichen, fg_mnr);
 K   ALTER TABLE ONLY public.fahrzeugvergabe DROP CONSTRAINT pkfahrzeugvergabe;
       public            postgres    false    226    226            �           2606    30939    firmenfahrzeug pkfirmenfahrzeug 
   CONSTRAINT     f   ALTER TABLE ONLY public.firmenfahrzeug
    ADD CONSTRAINT pkfirmenfahrzeug PRIMARY KEY (kennzeichen);
 I   ALTER TABLE ONLY public.firmenfahrzeug DROP CONSTRAINT pkfirmenfahrzeug;
       public            postgres    false    223            �           2606    30949    krankenkasse pkkrankenkasse 
   CONSTRAINT     Z   ALTER TABLE ONLY public.krankenkasse
    ADD CONSTRAINT pkkrankenkasse PRIMARY KEY (knr);
 E   ALTER TABLE ONLY public.krankenkasse DROP CONSTRAINT pkkrankenkasse;
       public            postgres    false    225            �           2606    30869    krankheitsfall pkkrankheitsfall 
   CONSTRAINT     ^   ALTER TABLE ONLY public.krankheitsfall
    ADD CONSTRAINT pkkrankheitsfall PRIMARY KEY (knr);
 I   ALTER TABLE ONLY public.krankheitsfall DROP CONSTRAINT pkkrankheitsfall;
       public            postgres    false    216            �           2606    30894    materialien pkmaterialien 
   CONSTRAINT     Z   ALTER TABLE ONLY public.materialien
    ADD CONSTRAINT pkmaterialien PRIMARY KEY (matnr);
 C   ALTER TABLE ONLY public.materialien DROP CONSTRAINT pkmaterialien;
       public            postgres    false    218            �           2606    30904    materialpos pkmaterialpos 
   CONSTRAINT     p   ALTER TABLE ONLY public.materialpos
    ADD CONSTRAINT pkmaterialpos PRIMARY KEY (matpos, map_matnr, map_plnr);
 C   ALTER TABLE ONLY public.materialpos DROP CONSTRAINT pkmaterialpos;
       public            postgres    false    220    220    220            �           2606    30899    medizin pkmedizin 
   CONSTRAINT     R   ALTER TABLE ONLY public.medizin
    ADD CONSTRAINT pkmedizin PRIMARY KEY (mednr);
 ;   ALTER TABLE ONLY public.medizin DROP CONSTRAINT pkmedizin;
       public            postgres    false    219            �           2606    30919    medizinpos pkmedizinpos 
   CONSTRAINT     n   ALTER TABLE ONLY public.medizinpos
    ADD CONSTRAINT pkmedizinpos PRIMARY KEY (medpos, mep_mednr, mep_plnr);
 A   ALTER TABLE ONLY public.medizinpos DROP CONSTRAINT pkmedizinpos;
       public            postgres    false    221    221    221            �           2606    30944    mitarbeiter pkmitarbeiter 
   CONSTRAINT     X   ALTER TABLE ONLY public.mitarbeiter
    ADD CONSTRAINT pkmitarbeiter PRIMARY KEY (mnr);
 C   ALTER TABLE ONLY public.mitarbeiter DROP CONSTRAINT pkmitarbeiter;
       public            postgres    false    224            �           2606    30969    patient pkpatient 
   CONSTRAINT     P   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT pkpatient PRIMARY KEY (pnr);
 ;   ALTER TABLE ONLY public.patient DROP CONSTRAINT pkpatient;
       public            postgres    false    227            �           2606    31004    pflegeeinsatz pkpflegeeinsatz 
   CONSTRAINT     ]   ALTER TABLE ONLY public.pflegeeinsatz
    ADD CONSTRAINT pkpflegeeinsatz PRIMARY KEY (penr);
 G   ALTER TABLE ONLY public.pflegeeinsatz DROP CONSTRAINT pkpflegeeinsatz;
       public            postgres    false    230            �           2606    30884 #   pflegeleistungen pkpflegeleistungen 
   CONSTRAINT     c   ALTER TABLE ONLY public.pflegeleistungen
    ADD CONSTRAINT pkpflegeleistungen PRIMARY KEY (plnr);
 M   ALTER TABLE ONLY public.pflegeleistungen DROP CONSTRAINT pkpflegeleistungen;
       public            postgres    false    217            �           2606    30864    symptome pksymptome 
   CONSTRAINT     T   ALTER TABLE ONLY public.symptome
    ADD CONSTRAINT pksymptome PRIMARY KEY (symnr);
 =   ALTER TABLE ONLY public.symptome DROP CONSTRAINT pksymptome;
       public            postgres    false    215            �           2606    30979    tourenplanung pktourenplanung 
   CONSTRAINT     g   ALTER TABLE ONLY public.tourenplanung
    ADD CONSTRAINT pktourenplanung PRIMARY KEY (t_mnr, t_datum);
 G   ALTER TABLE ONLY public.tourenplanung DROP CONSTRAINT pktourenplanung;
       public            postgres    false    228    228            �           2606    30989    tourenpos pktourenpos 
   CONSTRAINT     o   ALTER TABLE ONLY public.tourenpos
    ADD CONSTRAINT pktourenpos PRIMARY KEY (tpos, tp_mnr, tp_pnr, tp_datum);
 ?   ALTER TABLE ONLY public.tourenpos DROP CONSTRAINT pktourenpos;
       public            postgres    false    229    229    229    229            �           2606    31030 "   abrechnungspos fkabrechnungsposanr    FK CONSTRAINT     �   ALTER TABLE ONLY public.abrechnungspos
    ADD CONSTRAINT fkabrechnungsposanr FOREIGN KEY (ap_anr) REFERENCES public.abrechnung(anr);
 L   ALTER TABLE ONLY public.abrechnungspos DROP CONSTRAINT fkabrechnungsposanr;
       public          postgres    false    231    232    3295            �           2606    31025 #   abrechnungspos fkabrechnungspospenr    FK CONSTRAINT     �   ALTER TABLE ONLY public.abrechnungspos
    ADD CONSTRAINT fkabrechnungspospenr FOREIGN KEY (ap_penr) REFERENCES public.pflegeeinsatz(penr);
 M   ALTER TABLE ONLY public.abrechnungspos DROP CONSTRAINT fkabrechnungspospenr;
       public          postgres    false    230    232    3293            �           2606    31040    evaluation fkevaluationeknr    FK CONSTRAINT     �   ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT fkevaluationeknr FOREIGN KEY (e_eknr) REFERENCES public.evaluationskatalog(eknr);
 E   ALTER TABLE ONLY public.evaluation DROP CONSTRAINT fkevaluationeknr;
       public          postgres    false    233    222    3277            �           2606    31045    evaluation fkevaluationmnr    FK CONSTRAINT     ~   ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT fkevaluationmnr FOREIGN KEY (e_mnr) REFERENCES public.mitarbeiter(mnr);
 D   ALTER TABLE ONLY public.evaluation DROP CONSTRAINT fkevaluationmnr;
       public          postgres    false    3281    224    233            �           2606    31055    evaluation fkevaluationpenr    FK CONSTRAINT     �   ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT fkevaluationpenr FOREIGN KEY (e_penr) REFERENCES public.pflegeeinsatz(penr);
 E   ALTER TABLE ONLY public.evaluation DROP CONSTRAINT fkevaluationpenr;
       public          postgres    false    230    3293    233            �           2606    31050    evaluation fkevaluationpnr    FK CONSTRAINT     z   ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT fkevaluationpnr FOREIGN KEY (e_pnr) REFERENCES public.patient(pnr);
 D   ALTER TABLE ONLY public.evaluation DROP CONSTRAINT fkevaluationpnr;
       public          postgres    false    3287    227    233            �           2606    30955 ,   fahrzeugvergabe fkfahrzeugvergabekennzeichen    FK CONSTRAINT     �   ALTER TABLE ONLY public.fahrzeugvergabe
    ADD CONSTRAINT fkfahrzeugvergabekennzeichen FOREIGN KEY (fg_kennzeichen) REFERENCES public.firmenfahrzeug(kennzeichen);
 V   ALTER TABLE ONLY public.fahrzeugvergabe DROP CONSTRAINT fkfahrzeugvergabekennzeichen;
       public          postgres    false    226    223    3279            �           2606    30960 $   fahrzeugvergabe fkfahrzeugvergabemnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.fahrzeugvergabe
    ADD CONSTRAINT fkfahrzeugvergabemnr FOREIGN KEY (fg_mnr) REFERENCES public.mitarbeiter(mnr);
 N   ALTER TABLE ONLY public.fahrzeugvergabe DROP CONSTRAINT fkfahrzeugvergabemnr;
       public          postgres    false    224    3281    226            �           2606    30870 &   krankheitsfall fkkrankheitsfallk_erknr    FK CONSTRAINT     �   ALTER TABLE ONLY public.krankheitsfall
    ADD CONSTRAINT fkkrankheitsfallk_erknr FOREIGN KEY (k_erknr) REFERENCES public.erkrankung(erknr);
 P   ALTER TABLE ONLY public.krankheitsfall DROP CONSTRAINT fkkrankheitsfallk_erknr;
       public          postgres    false    214    3261    216            �           2606    30875 &   krankheitsfall fkkrankheitsfallk_symnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.krankheitsfall
    ADD CONSTRAINT fkkrankheitsfallk_symnr FOREIGN KEY (k_symnr) REFERENCES public.symptome(symnr);
 P   ALTER TABLE ONLY public.krankheitsfall DROP CONSTRAINT fkkrankheitsfallk_symnr;
       public          postgres    false    215    216    3263            �           2606    30905 "   materialpos fkmaterialposmap_matnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.materialpos
    ADD CONSTRAINT fkmaterialposmap_matnr FOREIGN KEY (map_matnr) REFERENCES public.materialien(matnr);
 L   ALTER TABLE ONLY public.materialpos DROP CONSTRAINT fkmaterialposmap_matnr;
       public          postgres    false    220    218    3269            �           2606    30910 !   materialpos fkmaterialposmap_plnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.materialpos
    ADD CONSTRAINT fkmaterialposmap_plnr FOREIGN KEY (map_plnr) REFERENCES public.pflegeleistungen(plnr);
 K   ALTER TABLE ONLY public.materialpos DROP CONSTRAINT fkmaterialposmap_plnr;
       public          postgres    false    3267    220    217            �           2606    30920    medizinpos fkmedizinposmednr    FK CONSTRAINT     �   ALTER TABLE ONLY public.medizinpos
    ADD CONSTRAINT fkmedizinposmednr FOREIGN KEY (mep_mednr) REFERENCES public.medizin(mednr);
 F   ALTER TABLE ONLY public.medizinpos DROP CONSTRAINT fkmedizinposmednr;
       public          postgres    false    221    219    3271            �           2606    30925    medizinpos fkmedizinposmep_plnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.medizinpos
    ADD CONSTRAINT fkmedizinposmep_plnr FOREIGN KEY (mep_plnr) REFERENCES public.pflegeleistungen(plnr);
 I   ALTER TABLE ONLY public.medizinpos DROP CONSTRAINT fkmedizinposmep_plnr;
       public          postgres    false    221    3267    217            �           2606    30970    patient fkpatient    FK CONSTRAINT     x   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT fkpatient FOREIGN KEY (pat_knr) REFERENCES public.krankenkasse(knr);
 ;   ALTER TABLE ONLY public.patient DROP CONSTRAINT fkpatient;
       public          postgres    false    3283    227    225            �           2606    31005     pflegeeinsatz fkpflegeeinsatzmnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.pflegeeinsatz
    ADD CONSTRAINT fkpflegeeinsatzmnr FOREIGN KEY (pe_tpos, pe_mnr, pe_pnr, pe_datum) REFERENCES public.tourenpos(tpos, tp_mnr, tp_pnr, tp_datum);
 J   ALTER TABLE ONLY public.pflegeeinsatz DROP CONSTRAINT fkpflegeeinsatzmnr;
       public          postgres    false    230    230    230    3291    229    229    229    229    230            �           2606    31010 !   pflegeeinsatz fkpflegeeinsatzplnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.pflegeeinsatz
    ADD CONSTRAINT fkpflegeeinsatzplnr FOREIGN KEY (pe_plnr) REFERENCES public.pflegeleistungen(plnr);
 K   ALTER TABLE ONLY public.pflegeeinsatz DROP CONSTRAINT fkpflegeeinsatzplnr;
       public          postgres    false    3267    230    217            �           2606    30885 &   pflegeleistungen fkpflegeleistungenknr    FK CONSTRAINT     �   ALTER TABLE ONLY public.pflegeleistungen
    ADD CONSTRAINT fkpflegeleistungenknr FOREIGN KEY (pl_knr) REFERENCES public.krankheitsfall(knr);
 P   ALTER TABLE ONLY public.pflegeleistungen DROP CONSTRAINT fkpflegeleistungenknr;
       public          postgres    false    216    217    3265            �           2606    30980     tourenplanung fktourenplanungmnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.tourenplanung
    ADD CONSTRAINT fktourenplanungmnr FOREIGN KEY (t_mnr) REFERENCES public.mitarbeiter(mnr);
 J   ALTER TABLE ONLY public.tourenplanung DROP CONSTRAINT fktourenplanungmnr;
       public          postgres    false    3281    228    224            �           2606    30990    tourenpos fktourenposmnr    FK CONSTRAINT     �   ALTER TABLE ONLY public.tourenpos
    ADD CONSTRAINT fktourenposmnr FOREIGN KEY (tp_mnr, tp_datum) REFERENCES public.tourenplanung(t_mnr, t_datum);
 B   ALTER TABLE ONLY public.tourenpos DROP CONSTRAINT fktourenposmnr;
       public          postgres    false    3289    229    229    228    228            �           2606    30995    tourenpos fktourenpospnr    FK CONSTRAINT     y   ALTER TABLE ONLY public.tourenpos
    ADD CONSTRAINT fktourenpospnr FOREIGN KEY (tp_pnr) REFERENCES public.patient(pnr);
 B   ALTER TABLE ONLY public.tourenpos DROP CONSTRAINT fktourenpospnr;
       public          postgres    false    3287    227    229            �   D   x�U˹�0�X׋��'����:�6`u�����6�i%����ҍ���Z<�#�e^p��      �   %   x�3�4�4�2��\�@Ҍ�H�s�I�=... L]7      �   �   x��M
�0@���)z1�iuS�u�����=OoҋY���+Y�ll����8F���P�jR��r�[�S���y2�p��q� ��P�9�2�Z��<y��������@�ᩓc��G��3Vt��[���a�Y��
�M7      �   5   x���  �P���c{��:�L&@p8R
3�r��_�g!�ѓ����� � ��      �   8   x�3���,I,JJ�,I-�2�H�IMOM��+N,��2����f��q��qqq �\�      �   0   x�s�p1430�4�r1M�8M`LCNc��4�0-�L3�=... y��      �   �   x�=�1
1E��^ af�3I��E���J� aA�xz��L�����iDTq r���`ȩ�J�ʺ>K�멙�Ћg���h�qW�K������ԛ�K�gP�A��_Fy5;�����ʺ��c�!�C;l�!5<[����,      �   F   x�3�t���LO-�2�
�2��9=�!b&`H̔3"db�D�9���,�,��%�'T�� �	��qqq (��      �   }   x�E�K
�0DףÔȿ&w���[/R�BO%V	�b�7�`8�k�2����ǅ,�״����Zӓ�L,S,3����G=Ī��� �+���i!������e������=��ANkI���U2�      �   �   x�-��
� ������c/��6����^(���l�|�a��͋���c}ɋS�4�F(���JYG������dä?�~C�6g�����{���i4��*	���5gr��0�槼���<t|��@Ll�n�:�2D�'��j���!��7�      �   3   x�3�4�?.eaq�F���1��aa&5�V� �      �   l   x�3�t��t��,�..�OK�42�30�4�2�H,JLN-I����4�psz&�姥�!M8=J�KR��J8-�,A�M9=s�����D��Д+F��� "��      �      x�3�4�?.eb��qqq )�n      �     x�e�;N�0�zr������m"�T��q6&1����T��b�F����������9�-����0=pJ)�h�qTzW���8x��N�!�P���F��S
�	�P��ݬ�N����P���6%���LJܒVݸ������wa.$~d4�.�C{��#<)w���1B%4)�d��|��/̡YO3f�.�q�l�1�;��*~bЂ�B��W@m��3��Nl�	ŵ��v�د��7�Ļr�	�xY�����7��.˲�z]      �   u  x�M�KN#1�u�)| <r�����H�Db��阴��H��l����b��C쬶��W# <����e� 褢LS.�rCf)Ğ�L0����]}u��Vi+`�m�!�	��é��]�EH�o8�*}�
��_y��b�"��0�]�P��_ hA#jW�Vu�5̔��(&��.O�"��QgPp�¡l��]qU���Ə��E7���S����3կ~5��U�3����!��x��2uR5갱o�^�1�z�2E�����'΍՜�۴-�^�V"7��Y|G��'N��VV`�@�4�o�>��n)UOX�enJ
�=�	 �B����m��C��/�>���N��F85����O�4�uϟ@      �   �   x�e�Q
�0��.]�Ĵ�Yz�s�KL�R$ ���()<%�C�0#ծ�EFSF�F��VM�,��(h�<0�6�
]��zarEJr��!�y7�5�IعA��vo�lLvB��ti�uBH/��C��kڽ�t�NG3y~~��w�:Q      �   w   x�3�44�t��t�u-*.��-H+�K�40�24�20�2B�;���e'g`(2)
(-�J��40�22 	���o+*H-*H�IMOi0˙���R���R��S�3�Ss@��`�=... ��)X      �   �   x�E�;�0�z�� ��/iB$


$D�[�7�v@�<܄��4���f��]w���z��3*��4L)w� ��:xv�C0:��&����[����V_��B�[Ҧ�֖5���RB^�ފ/��б�A`}/��1F���ɨ��y��_4�=U      �   h   x�]���0Dѳ�%�jI�u����8�?c�Rĳz��.�T7�4�t
�C:+,j��]j����l��:7�f�zO�x����vŇ�M�+]LD?�>&P      �   >   x�Uͻ  �:�'A����0%���	$ܤ�4
�!�C�pf�f"�����۷����     