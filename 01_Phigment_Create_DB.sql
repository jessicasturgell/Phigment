USE [master]

IF db_id('Phigment') IS NULL
    CREATE DATABASE [Phigment]
GO

USE [Phigment]
GO

DROP TABLE IF EXISTS [Image];
DROP TABLE IF EXISTS [PaletteSwatch];
DROP TABLE IF EXISTS [ProjectPalette];
DROP TABLE IF EXISTS [UserPalette];
DROP TABLE IF EXISTS [Swatch];
DROP TABLE IF EXISTS [Palette];
DROP TABLE IF EXISTS [UserProject];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [User];
GO

CREATE TABLE [User] (
    [Id] integer PRIMARY KEY IDENTITY(1,1),
    [DisplayName] nvarchar(30) NOT NULL
);

CREATE TABLE [Project] (
    [Id] integer PRIMARY KEY IDENTITY(1,1),
    [UserId] integer NOT NULL,
    [Name] nvarchar(30) NOT NULL,
    [Blurb] nvarchar(350) NOT NULL,
    [Notes] nvarchar(MAX) NOT NULL,
    [IsPublic] bit NOT NULL,
    CONSTRAINT [FK_Project_User] FOREIGN KEY ([UserId])
        REFERENCES [User] ([Id])
);

CREATE TABLE [UserProject] (
    [Id] integer PRIMARY KEY IDENTITY(1,1),
    [UserId] integer NOT NULL,
    [ProjectId] integer NOT NULL,
    CONSTRAINT [FK_UserProject_User] FOREIGN KEY ([UserId])
        REFERENCES [User] ([Id]),
    CONSTRAINT [FK_UserProject_Project] FOREIGN KEY ([ProjectId])
        REFERENCES [Project] ([Id])
);

CREATE TABLE [Palette] (
    [Id] integer PRIMARY KEY IDENTITY(1,1),
    [UserId] integer NOT NULL,
    [Name] nvarchar(30) NOT NULL,
    [IsPublic] bit NOT NULL,
    CONSTRAINT [FK_Palette_User] FOREIGN KEY ([UserId])
        REFERENCES [User] ([Id])
);

CREATE TABLE [Swatch] (
    [Id] integer PRIMARY KEY IDENTITY(1,1),
    [UserId] integer NOT NULL,
    [Name] nvarchar(30) NOT NULL,
    [HEX] nvarchar(7) NOT NULL,
    [RGB] nvarchar(16) NOT NULL,
    [HSL] nvarchar(16) NOT NULL,
    CONSTRAINT [FK_Swatch_User] FOREIGN KEY ([UserId])
        REFERENCES [User] ([Id])
);

CREATE TABLE [UserPalette] (
    [Id] integer PRIMARY KEY IDENTITY(1,1),
    [UserId] integer NOT NULL,
    [PaletteId] integer NOT NULL,
    CONSTRAINT [FK_UserPalette_User] FOREIGN KEY ([UserId])
        REFERENCES [User] ([Id]),
    CONSTRAINT [FK_UserPalette_Palette] FOREIGN KEY ([PaletteId])
        REFERENCES [Palette] ([Id])
);

CREATE TABLE [ProjectPalette] (
    [Id] integer PRIMARY KEY IDENTITY(1,1),
    [ProjectId] integer NOT NULL,
    [PaletteId] integer NOT NULL,
    CONSTRAINT [FK_ProjectPalette_Project] FOREIGN KEY ([ProjectId])
        REFERENCES [Project] ([Id]),
    CONSTRAINT [FK_ProjectPalette_Palette] FOREIGN KEY ([PaletteId])
        REFERENCES [Palette] ([Id])
);

CREATE TABLE [PaletteSwatch] (
    [Id] integer PRIMARY KEY IDENTITY(1,1),
    [PaletteId] integer NOT NULL,
    [SwatchId] integer NOT NULL,
    CONSTRAINT [FK_PaletteSwatch_Palette] FOREIGN KEY ([PaletteId])
        REFERENCES [Palette] ([Id]),
    CONSTRAINT [FK_PaletteSwatch_Swatch] FOREIGN KEY ([SwatchId])
        REFERENCES [Swatch] ([Id])
);

CREATE TABLE [Image] (
    [Id] integer PRIMARY KEY IDENTITY(1,1),
    [ProjectId] integer NOT NULL,
    [ImageLocation] nvarchar(30) NOT NULL,
    CONSTRAINT [FK_Image_Project] FOREIGN KEY ([ProjectId])
        REFERENCES [Project] ([Id])
);

GO
