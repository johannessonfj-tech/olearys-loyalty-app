const TEAMS = {
  football: {
    label: 'Football',
    sections: [
      {
        title: 'National Teams',
        teams: [
          { id: 'nt-sweden', name: 'Sweden', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Sweden_national_football_team_seal.svg/50px-Sweden_national_football_team_seal.svg.png' },
          { id: 'nt-england', name: 'England', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/England_football_badge.svg/50px-England_football_badge.svg.png' },
          { id: 'nt-germany', name: 'Germany', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/DFBEagle.svg/50px-DFBEagle.svg.png' },
          { id: 'nt-france', name: 'France', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/French_Football_Federation_logo.svg/50px-French_Football_Federation_logo.svg.png' },
          { id: 'nt-spain', name: 'Spain', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Royal_Spanish_Football_Federation_logo.svg/50px-Royal_Spanish_Football_Federation_logo.svg.png' },
          { id: 'nt-italy', name: 'Italy', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Federazione_Italiana_Giuoco_Calcio_logo.svg/50px-Federazione_Italiana_Giuoco_Calcio_logo.svg.png' },
          { id: 'nt-netherlands', name: 'Netherlands', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/KNVB_Logo.svg/50px-KNVB_Logo.svg.png' },
          { id: 'nt-portugal', name: 'Portugal', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Portuguese_Football_Federation_logo.svg/50px-Portuguese_Football_Federation_logo.svg.png' },
          { id: 'nt-brazil', name: 'Brazil', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Brazilian_Football_Confederation_logo.svg/50px-Brazilian_Football_Confederation_logo.svg.png' },
          { id: 'nt-argentina', name: 'Argentina', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Argentina_national_football_team_logo.svg/50px-Argentina_national_football_team_logo.svg.png' },
          { id: 'nt-norway', name: 'Norway', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Football_Association_of_Norway_logo.svg/50px-Football_Association_of_Norway_logo.svg.png' },
          { id: 'nt-denmark', name: 'Denmark', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Danish_Football_Association_logo.svg/50px-Danish_Football_Association_logo.svg.png' },
        ],
      },
      {
        title: 'Clubs',
        teams: [
          { id: 'arsenal', name: 'Arsenal', logo: 'https://resources.premierleague.com/premierleague/badges/50/t3.png' },
          { id: 'liverpool', name: 'Liverpool', logo: 'https://resources.premierleague.com/premierleague/badges/50/t14.png' },
          { id: 'man-utd', name: 'Manchester United', logo: 'https://resources.premierleague.com/premierleague/badges/50/t1.png' },
          { id: 'man-city', name: 'Manchester City', logo: 'https://resources.premierleague.com/premierleague/badges/50/t43.png' },
          { id: 'chelsea', name: 'Chelsea', logo: 'https://resources.premierleague.com/premierleague/badges/50/t8.png' },
          { id: 'tottenham', name: 'Tottenham', logo: 'https://resources.premierleague.com/premierleague/badges/50/t6.png' },
          { id: 'barcelona', name: 'FC Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/50px-FC_Barcelona_%28crest%29.svg.png' },
          { id: 'real-madrid', name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/50px-Real_Madrid_CF.svg.png' },
          { id: 'bayern', name: 'Bayern Munich', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/50px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png' },
          { id: 'psg', name: 'PSG', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/50px-Paris_Saint-Germain_F.C..svg.png' },
          { id: 'juventus', name: 'Juventus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Juventus_FC_%282017%29_logo.svg/50px-Juventus_FC_%282017%29_logo.svg.png' },
          { id: 'ac-milan', name: 'AC Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/50px-Logo_of_AC_Milan.svg.png' },
          { id: 'inter', name: 'Inter Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/50px-FC_Internazionale_Milano_2021.svg.png' },
          { id: 'dortmund', name: 'Borussia Dortmund', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/50px-Borussia_Dortmund_logo.svg.png' },
          { id: 'aik', name: 'AIK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/AIK_logo.svg/50px-AIK_logo.svg.png' },
          { id: 'djurgarden', name: 'Djurgårdens IF', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Djurg%C3%A5rdens_IF_logo.svg/50px-Djurg%C3%A5rdens_IF_logo.svg.png' },
          { id: 'hammarby', name: 'Hammarby IF', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Hammarby_IF_logo.svg/50px-Hammarby_IF_logo.svg.png' },
          { id: 'ifk-goteborg', name: 'IFK Göteborg', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/IFK_G%C3%B6teborg_logo.svg/50px-IFK_G%C3%B6teborg_logo.svg.png' },
          { id: 'malmo-ff', name: 'Malmö FF', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Malm%C3%B6_FF_logo.svg/50px-Malm%C3%B6_FF_logo.svg.png' },
        ],
      },
    ],
  },
  hockey: {
    label: 'Ice Hockey',
    sections: [
      {
        title: 'National Teams',
        teams: [
          { id: 'nt-hockey-sweden', name: 'Sweden', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Swedish_Ice_Hockey_Association_logo.svg/50px-Swedish_Ice_Hockey_Association_logo.svg.png' },
          { id: 'nt-hockey-finland', name: 'Finland', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Suomen_J%C3%A4%C3%A4kiekkoliitto_logo.svg/50px-Suomen_J%C3%A4%C3%A4kiekkoliitto_logo.svg.png' },
          { id: 'nt-hockey-canada', name: 'Canada', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Hockey_Canada_Logo.svg/50px-Hockey_Canada_Logo.svg.png' },
          { id: 'nt-hockey-usa', name: 'USA', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/43/USA_Hockey.svg/50px-USA_Hockey.svg.png' },
          { id: 'nt-hockey-czech', name: 'Czech Republic', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Czech_Ice_Hockey_Association_logo.svg/50px-Czech_Ice_Hockey_Association_logo.svg.png' },
          { id: 'nt-hockey-russia', name: 'Russia', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Ice_Hockey_Federation_of_Russia_logo.svg/50px-Ice_Hockey_Federation_of_Russia_logo.svg.png' },
        ],
      },
      {
        title: 'SHL',
        teams: [
          { id: 'lulea-hf', name: 'Luleå HF', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Lule%C3%A5_HF_logo.svg/50px-Lule%C3%A5_HF_logo.svg.png' },
          { id: 'farjestad', name: 'Färjestad BK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/F%C3%A4rjestad_BK_logo.svg/50px-F%C3%A4rjestad_BK_logo.svg.png' },
          { id: 'djurgarden-hockey', name: 'Djurgårdens IF Hockey', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Djurg%C3%A5rdens_IF_logo.svg/50px-Djurg%C3%A5rdens_IF_logo.svg.png' },
          { id: 'frolunda', name: 'Frölunda HC', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Fr%C3%B6lunda_HC_logo.svg/50px-Fr%C3%B6lunda_HC_logo.svg.png' },
          { id: 'brynas', name: 'Brynäs IF', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Bryn%C3%A4s_IF_logo.svg/50px-Bryn%C3%A4s_IF_logo.svg.png' },
          { id: 'hv71', name: 'HV71', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/HV71_logo.svg/50px-HV71_logo.svg.png' },
          { id: 'skelleftea', name: 'Skellefteå AIK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Skellefte%C3%A5_AIK_logo.svg/50px-Skellefte%C3%A5_AIK_logo.svg.png' },
          { id: 'orebro-hk', name: 'Örebro HK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/%C3%96rebro_HK_logo.svg/50px-%C3%96rebro_HK_logo.svg.png' },
          { id: 'rogle', name: 'Rögle BK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/R%C3%B6gle_BK_logo.svg/50px-R%C3%B6gle_BK_logo.svg.png' },
          { id: 'linkoping-hc', name: 'Linköping HC', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Link%C3%B6ping_HC_logo.svg/50px-Link%C3%B6ping_HC_logo.svg.png' },
          { id: 'vaxjo-lakers', name: 'Växjö Lakers', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/V%C3%A4xj%C3%B6_Lakers_logo.svg/50px-V%C3%A4xj%C3%B6_Lakers_logo.svg.png' },
          { id: 'modo', name: 'MODO Hockey', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Modo_Hockey_logo.svg/50px-Modo_Hockey_logo.svg.png' },
        ],
      },
      {
        title: 'NHL',
        teams: [
          { id: 'ny-rangers', name: 'New York Rangers', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/New_York_Rangers.svg/50px-New_York_Rangers.svg.png' },
          { id: 'toronto', name: 'Toronto Maple Leafs', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Toronto_Maple_Leafs_2016_logo.svg/50px-Toronto_Maple_Leafs_2016_logo.svg.png' },
          { id: 'detroit', name: 'Detroit Red Wings', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Detroit_Red_Wings_logo.svg/50px-Detroit_Red_Wings_logo.svg.png' },
          { id: 'boston', name: 'Boston Bruins', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/50px-Boston_Bruins.svg.png' },
          { id: 'chicago', name: 'Chicago Blackhawks', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Chicago_Blackhawks_logo.svg/50px-Chicago_Blackhawks_logo.svg.png' },
          { id: 'washington', name: 'Washington Capitals', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Washington_Capitals.svg/50px-Washington_Capitals.svg.png' },
        ],
      },
    ],
  },
}

// Flat list of all teams (for TeamsContext compatibility)
export const ALL_TEAMS = Object.entries(TEAMS).flatMap(([sport, { sections }]) =>
  sections.flatMap(section => section.teams.map((t) => ({ ...t, sport })))
)

export default TEAMS
