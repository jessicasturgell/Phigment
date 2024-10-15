USE [Phigment]
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [User] ([Id], [DisplayName], [JoinDateTime], [Bio], [Image]) VALUES
(1, 'PestoPingu', '2023-01-15 10:30:00', 'Lover of all things green and delicious.', 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=PestoPingu'),
(2, 'MizMooDeng', '2023-03-01 14:45:00', 'Creator of the P!nk Hippo Club, artistic director.', 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=MizMooDeng'),
(3, 'HuaHuaLOL', '2023-05-22 09:00:00', 'Future sushi chef and part-time color enthusiast.', 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=HuaHuaLOL');
SET IDENTITY_INSERT [User] OFF

SET IDENTITY_INSERT [Project] ON
INSERT INTO [Project] ([Id], [UserId], [Name], [Blurb], [Notes], [IsPublic]) VALUES
(1, 1, 'Snack Time', 'Colors that inspire me to be my biggest, warmest self.', 'Caution: May be too inspiring. Mom put me in time out for eating all the snacks.', 1),
(2, 2, 'P!nk Hippo Club', 'Project planning for the P!nk Hippo Club music video launching February of next year. Lights, glitter, action!', 'Ran out of glitter due to glitter shortage.', 0),
(3, 3, 'Onigiri', 'Beautiful colors for beautiful sushi rolls.', 'Note to self: Learn what sushi is?????', 1);
SET IDENTITY_INSERT [Project] OFF

SET IDENTITY_INSERT [UserProject] ON
INSERT INTO [UserProject] ([Id], [UserId], [ProjectId]) VALUES
(1, 1, 1),
(2, 3, 3);
SET IDENTITY_INSERT [UserProject] OFF

SET IDENTITY_INSERT [Palette] ON
INSERT INTO [Palette] ([Id], [UserId], [Name], [IsPublic]) VALUES
(1, 1, 'Yummy Yellows', 1),
(2, 2, 'GO GO GIRL', 0),
(3, 3, 'Rice & Carrots', 1);
SET IDENTITY_INSERT [Palette] OFF

SET IDENTITY_INSERT [Swatch] ON
INSERT INTO [Swatch] ([Id], [UserId], [Name], [HEX], [RGB], [HSL]) VALUES
(1, 1, 'Yellow', '#FFFF00', '255,255,0', '60,100,50'),
(2, 1, 'Light Yellow', '#FFFFE0', '255,255,224', '60,100,94'),
(3, 1, 'White', '#FFFFFF', '255,255,255', '0,0,100'),
(4, 2, 'Pretty Pink', '#FF69B4', '255,105,180', '330,100,71'),
(5, 2, 'Silver', '#C0C0C0', '192,192,192', '0,0,75'),
(6, 2, 'Black', '#000000', '0,0,0', '0,0,0'),
(7, 3, 'Carrot', '#FFA500', '255,165,0', '39,100,50'),
(8, 3, 'Rice', '#E3CFCF', '227,207,207', '0,10,89'),
(9, 3, 'Black', '#000000', '0,0,0', '0,0,0');
SET IDENTITY_INSERT [Swatch] OFF

SET IDENTITY_INSERT [UserPalette] ON
INSERT INTO [UserPalette] ([Id], [UserId], [PaletteId]) VALUES
(1, 1, 1),
(2, 3, 3);
SET IDENTITY_INSERT [UserPalette] OFF

SET IDENTITY_INSERT [ProjectPalette] ON
INSERT INTO [ProjectPalette] ([Id], [ProjectId], [PaletteId]) VALUES
(1, 1, 1),
(2, 3, 3);
SET IDENTITY_INSERT [ProjectPalette] OFF

SET IDENTITY_INSERT [PaletteSwatch] ON
INSERT INTO [PaletteSwatch] ([Id], [PaletteId], [SwatchId]) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6),
(7, 3, 7),
(8, 3, 8),
(9, 3, 9);
SET IDENTITY_INSERT [PaletteSwatch] OFF

SET IDENTITY_INSERT [Image] ON
INSERT INTO [Image] ([Id], [ProjectId], [ImageLocation]) VALUES
(1, 1, 'snacks.png'),
(2, 2, 'girly.png'),
(3, 3, 'sushi.png');
SET IDENTITY_INSERT [Image] OFF

GO
