CREATE TYPE gametypes AS ENUM ('TEKKEN_7', 'SFV', 'STREET_FIGHTER_6','KOF_XV', 'GUILTY_GEAR_STRIVE', 'TEKKEN_8', 'MORTAL_KOMBAT_1')
CREATE TYPE oauthtypes AS ENUM ('GOOGLE');


insert into game_characters (id, code, name, game) values (999999, 'MASTER_RAVEN', 'Master Raven', 'TEKKEN_7');