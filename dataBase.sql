-- Table: public.Asset

-- DROP TABLE IF EXISTS public."Asset";

CREATE TABLE IF NOT EXISTS public."Asset"
(
    "Id" integer NOT NULL DEFAULT nextval('asset_id_seq'::regclass),
    "SerialNumber" character varying(50) COLLATE pg_catalog."default",
    "AssetTypeId" integer NOT NULL,
    "AssetStatusId" integer NOT NULL,
    "PurchaseDate" date,
    "FiscalHorsepower" integer,
    "CurrentFuelQuantity" double precision NOT NULL,
    "FuelCapacity" integer NOT NULL,
    CONSTRAINT asset_pkey PRIMARY KEY ("Id"),
    CONSTRAINT fk_assetstatus FOREIGN KEY ("AssetStatusId")
        REFERENCES public."AssetStatus" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_assettype FOREIGN KEY ("AssetTypeId")
        REFERENCES public."AssetType" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Asset"
    OWNER to postgres;

-- Table: public.AssetStatus

-- DROP TABLE IF EXISTS public."AssetStatus";

CREATE TABLE IF NOT EXISTS public."AssetStatus"
(
    "Id" integer NOT NULL DEFAULT nextval('assetstatus_id_seq'::regclass),
    "StatusLabel" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT assetstatus_pkey PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."AssetStatus"
    OWNER to postgres;

-- Table: public.AssetType

-- DROP TABLE IF EXISTS public."AssetType";

CREATE TABLE IF NOT EXISTS public."AssetType"
(
    "Id" integer NOT NULL DEFAULT nextval('assettype_id_seq'::regclass),
    "Mch" character varying(10) COLLATE pg_catalog."default",
    "TypeLabel" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT assettype_pkey PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."AssetType"
    OWNER to postgres;

	-- Table: public.Employee

-- DROP TABLE IF EXISTS public."Employee";

CREATE TABLE IF NOT EXISTS public."Employee"
(
    "Id" integer NOT NULL DEFAULT nextval('employee_id_seq'::regclass),
    "FirstName" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "LastName" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "BirthDate" date NOT NULL,
    CONSTRAINT employee_pkey PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Employee"
    OWNER to postgres;

-- Table: public.FuelAssetRefill

-- DROP TABLE IF EXISTS public."FuelAssetRefill";

CREATE TABLE IF NOT EXISTS public."FuelAssetRefill"
(
    "Id" integer NOT NULL DEFAULT nextval('fuelassetrefill_id_seq'::regclass),
    "ReffilDate" timestamp with time zone NOT NULL,
    "AssetId" integer NOT NULL,
    "FuelDepotId" integer NOT NULL,
    "Quantity" double precision NOT NULL,
    "IsFull" integer NOT NULL,
    CONSTRAINT fuelassetrefill_pkey PRIMARY KEY ("Id"),
    CONSTRAINT fk_asset FOREIGN KEY ("AssetId")
        REFERENCES public."Asset" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_fuel_depot FOREIGN KEY ("FuelDepotId")
        REFERENCES public."FuelDepot" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."FuelAssetRefill"
    OWNER to postgres;

-- Table: public.FuelDepot

-- DROP TABLE IF EXISTS public."FuelDepot";

CREATE TABLE IF NOT EXISTS public."FuelDepot"
(
    "Id" integer NOT NULL DEFAULT nextval('fueldepots_id_seq'::regclass),
    "TypeId" integer NOT NULL,
    "LocationId" integer NOT NULL,
    "DepotName" character varying(100) COLLATE pg_catalog."default",
    "Capacity" integer NOT NULL,
    "CurrentLevel" integer,
    "Reference" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT fueldepots_pkey PRIMARY KEY ("Id"),
    CONSTRAINT fk_fueltype FOREIGN KEY ("TypeId")
        REFERENCES public."FuelDepotType" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_siteaddress FOREIGN KEY ("LocationId")
        REFERENCES public."Location" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."FuelDepot"
    OWNER to postgres;

-- Table: public.FuelDepotRefill

-- DROP TABLE IF EXISTS public."FuelDepotRefill";

CREATE TABLE IF NOT EXISTS public."FuelDepotRefill"
(
    "Id" integer NOT NULL DEFAULT nextval('fuelreffil_id_seq'::regclass),
    "FuelDepotId" integer NOT NULL,
    "ReffilDate" date NOT NULL,
    "Quantity" double precision NOT NULL,
    CONSTRAINT fuelreffil_pkey PRIMARY KEY ("Id"),
    CONSTRAINT fk_fueldepots FOREIGN KEY ("FuelDepotId")
        REFERENCES public."FuelDepot" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."FuelDepotRefill"
    OWNER to postgres;

-- Table: public.FuelDepotType

-- DROP TABLE IF EXISTS public."FuelDepotType";

CREATE TABLE IF NOT EXISTS public."FuelDepotType"
(
    "Id" integer NOT NULL DEFAULT nextval('fueldepotstype_id_seq'::regclass),
    "Label" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT fueldepotstype_pkey PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."FuelDepotType"
    OWNER to postgres;

-- Table: public.Location

-- DROP TABLE IF EXISTS public."Location";

CREATE TABLE IF NOT EXISTS public."Location"
(
    "Id" integer NOT NULL DEFAULT nextval('siteaddress_id_seq'::regclass),
    "Address" character varying(500) COLLATE pg_catalog."default" NOT NULL,
    "City" character varying(50) COLLATE pg_catalog."default",
    "LocationTypeId" integer,
    CONSTRAINT siteaddress_pkey PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Location_LocationType" FOREIGN KEY ("LocationTypeId")
        REFERENCES public."LocationType" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Location"
    OWNER to postgres;

-- Table: public.LocationType

-- DROP TABLE IF EXISTS public."LocationType";

CREATE TABLE IF NOT EXISTS public."LocationType"
(
    "Id" integer NOT NULL DEFAULT nextval('"LocationType_Id_seq"'::regclass),
    "Name" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "LocationType_pkey" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."LocationType"
    OWNER to postgres;

-- Table: public.Mission

-- DROP TABLE IF EXISTS public."Mission";

CREATE TABLE IF NOT EXISTS public."Mission"
(
    "Id" integer NOT NULL DEFAULT nextval('job_id_seq'::regclass),
    "MissionTitle" character varying(100) COLLATE pg_catalog."default",
    "MissionDesc" character varying(1000) COLLATE pg_catalog."default",
    "EmployeeId" integer NOT NULL,
    "MissionTypeId" integer,
    "StartDate" date,
    "EndDate" date,
    "AssetId" integer,
    CONSTRAINT job_pkey PRIMARY KEY ("Id"),
    CONSTRAINT fk_employee FOREIGN KEY ("EmployeeId")
        REFERENCES public."Employee" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Mission"
    OWNER to postgres;

-- Table: public.MissionBusinessTrip

-- DROP TABLE IF EXISTS public."MissionBusinessTrip";

CREATE TABLE IF NOT EXISTS public."MissionBusinessTrip"
(
    "Id" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "MissionId" integer NOT NULL,
    "FromLocationId" integer NOT NULL,
    "Distance" numeric(10,2) NOT NULL,
    "ToLocationId" integer,
    CONSTRAINT "MissionBusinessTrip_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT fk_location_business_trip FOREIGN KEY ("FromLocationId")
        REFERENCES public."Location" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_mission_business_trip FOREIGN KEY ("MissionId")
        REFERENCES public."Mission" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."MissionBusinessTrip"
    OWNER to postgres;

-- Table: public.MissionConstructionSite

-- DROP TABLE IF EXISTS public."MissionConstructionSite";

CREATE TABLE IF NOT EXISTS public."MissionConstructionSite"
(
    "Id" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "MissionId" integer NOT NULL,
    "Hours" numeric(5,2) NOT NULL,
    "LocationId" integer NOT NULL,
    CONSTRAINT "MissionConstructionSite_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT fk_chantier FOREIGN KEY ("LocationId")
        REFERENCES public."Location" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_mission_construction_site FOREIGN KEY ("MissionId")
        REFERENCES public."Mission" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."MissionConstructionSite"
    OWNER to postgres;

-- Table: public.MissionType

-- DROP TABLE IF EXISTS public."MissionType";

CREATE TABLE IF NOT EXISTS public."MissionType"
(
    "Id" integer NOT NULL DEFAULT nextval('"missiontype_Id_seq"'::regclass),
    "Label" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT missiontype_pkey PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."MissionType"
    OWNER to postgres;
