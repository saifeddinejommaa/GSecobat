-- =========================
-- TABLES DE BASE
-- =========================

CREATE TABLE IF NOT EXISTS public."AssetStatus"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "StatusLabel" character varying(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS public."AssetType"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Mch" character varying(10),
    "TypeLabel" character varying(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS public."Employee"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "FirstName" character varying(100) NOT NULL,
    "LastName" character varying(100) NOT NULL,
    "BirthDate" date NOT NULL
);

CREATE TABLE IF NOT EXISTS public."FuelDepotType"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Label" character varying(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS public."LocationType"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Name" character varying(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS public."MissionType"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Label" character varying(100) NOT NULL
);

-- =========================
-- LOCATION
-- =========================

CREATE TABLE IF NOT EXISTS public."Location"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Address" character varying(500) NOT NULL,
    "City" character varying(50),
    "LocationTypeId" integer,
    CONSTRAINT "FK_Location_LocationType"
        FOREIGN KEY ("LocationTypeId")
        REFERENCES public."LocationType" ("Id")
        ON DELETE SET NULL
);

-- =========================
-- ASSET
-- =========================

CREATE TABLE IF NOT EXISTS public."Asset"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "SerialNumber" character varying(50),
    "AssetTypeId" integer NOT NULL,
    "AssetStatusId" integer NOT NULL,
    "PurchaseDate" date,
    "FiscalHorsepower" integer,
    "CurrentFuelQuantity" double precision NOT NULL,
    "FuelCapacity" integer NOT NULL,

    CONSTRAINT fk_assettype
        FOREIGN KEY ("AssetTypeId")
        REFERENCES public."AssetType" ("Id"),

    CONSTRAINT fk_assetstatus
        FOREIGN KEY ("AssetStatusId")
        REFERENCES public."AssetStatus" ("Id")
);

-- =========================
-- FUEL DEPOT
-- =========================

CREATE TABLE IF NOT EXISTS public."FuelDepot"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "TypeId" integer NOT NULL,
    "LocationId" integer NOT NULL,
    "DepotName" character varying(100),
    "Capacity" integer NOT NULL,
    "CurrentLevel" integer,
    "Reference" character varying(50) NOT NULL,

    CONSTRAINT fk_fueltype
        FOREIGN KEY ("TypeId")
        REFERENCES public."FuelDepotType" ("Id"),

    CONSTRAINT fk_location
        FOREIGN KEY ("LocationId")
        REFERENCES public."Location" ("Id")
);

-- =========================
-- FUEL REFILLS
-- =========================

CREATE TABLE IF NOT EXISTS public."FuelAssetRefill"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ReffilDate" timestamptz NOT NULL,
    "AssetId" integer NOT NULL,
    "FuelDepotId" integer NOT NULL,
    "Quantity" double precision NOT NULL,
    "IsFull" integer NOT NULL,

    CONSTRAINT fk_asset
        FOREIGN KEY ("AssetId")
        REFERENCES public."Asset" ("Id"),

    CONSTRAINT fk_fuel_depot
        FOREIGN KEY ("FuelDepotId")
        REFERENCES public."FuelDepot" ("Id")
);

CREATE TABLE IF NOT EXISTS public."FuelDepotRefill"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "FuelDepotId" integer NOT NULL,
    "ReffilDate" date NOT NULL,
    "Quantity" double precision NOT NULL,

    CONSTRAINT fk_fueldepots
        FOREIGN KEY ("FuelDepotId")
        REFERENCES public."FuelDepot" ("Id")
);

-- =========================
-- MISSION
-- =========================

CREATE TABLE IF NOT EXISTS public."Mission"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "MissionTitle" character varying(100),
    "MissionDesc" character varying(1000),
    "EmployeeId" integer NOT NULL,
    "MissionTypeId" integer,
    "StartDate" date,
    "EndDate" date,
    "AssetId" integer,

    CONSTRAINT fk_employee
        FOREIGN KEY ("EmployeeId")
        REFERENCES public."Employee" ("Id"),

    CONSTRAINT fk_missiontype
        FOREIGN KEY ("MissionTypeId")
        REFERENCES public."MissionType" ("Id"),

    CONSTRAINT fk_asset_mission
        FOREIGN KEY ("AssetId")
        REFERENCES public."Asset" ("Id")
);

-- =========================
-- MISSION BUSINESS TRIP
-- =========================

CREATE TABLE IF NOT EXISTS public."MissionBusinessTrip"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "MissionId" integer NOT NULL,
    "FromLocationId" integer NOT NULL,
    "ToLocationId" integer,
    "Distance" numeric(10,2) NOT NULL,

    CONSTRAINT fk_mission_business_trip
        FOREIGN KEY ("MissionId")
        REFERENCES public."Mission" ("Id")
        ON DELETE CASCADE,

    CONSTRAINT fk_location_business_trip
        FOREIGN KEY ("FromLocationId")
        REFERENCES public."Location" ("Id")
        ON DELETE CASCADE
);

-- =========================
-- MISSION CONSTRUCTION SITE
-- =========================

CREATE TABLE IF NOT EXISTS public."MissionConstructionSite"
(
    "Id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "MissionId" integer NOT NULL,
    "LocationId" integer NOT NULL,
    "Hours" numeric(5,2) NOT NULL,

    CONSTRAINT fk_mission_construction_site
        FOREIGN KEY ("MissionId")
        REFERENCES public."Mission" ("Id")
        ON DELETE CASCADE,

    CONSTRAINT fk_chantier
        FOREIGN KEY ("LocationId")
        REFERENCES public."Location" ("Id")
);