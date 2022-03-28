
import React, {useEffect, useState} from 'react';
import HomePage from '../../src/pages/home';
import Layout from '../../src/layouts';

function Home() {
  const [imgsLoaded, setImgsLoaded] = useState(false)

  useEffect(() => {
    var IMAGES = [
      "/images/cards/abaia.png",
      "/images/cards/aethon.png",
      "/images/cards/aion.png",
      "/images/cards/artio.png",
      "/images/cards/asazel.png",
      "/images/cards/azazel.png",
      "/images/cards/azrael.png",
      "/images/cards/bael.png",
      "/images/cards/banshee.png",
      "/images/cards/beelzebub.png",
      "/images/cards/black_horse.png",
      "/images/cards/carcinus.png",
      "/images/cards/celtic_harp.png",
      "/images/cards/centaur.png",
      "/images/cards/cerberus.png",
      "/images/cards/cernunnos.png",
      "/images/cards/colchis_bull.png",
      "/images/cards/cyclops.png",
      "/images/cards/dark_spirit.png",
      "/images/cards/death.png",
      "/images/cards/dragon.png",
      "/images/cards/druid.png",
      "/images/cards/dryad.png",
      "/images/cards/earth_spirit.png",
      "/images/cards/fenrir.png",
      "/images/cards/fire_spirit.png",
      "/images/cards/gabriel.png",
      "/images/cards/gargoyle.png",
      "/images/cards/garuda.png",
      "/images/cards/genasi.png",
      "/images/cards/giant_boar.png",
      "/images/cards/golem.png",
      "/images/cards/grimoire.png",
      "/images/cards/gryphon.png",
      "/images/cards/harpy.png",
      "/images/cards/hellhound.png",
      "/images/cards/hydra.png",
      "/images/cards/ibis.png",
      "/images/cards/jentil.png",
      "/images/cards/khnum.png",
      "/images/cards/kraken.png",
      "/images/cards/lilith.png",
      "/images/cards/lucifer.png",
      "/images/cards/man-eater.png",
      "/images/cards/manticore.png",
      "/images/cards/marool.png",
      "/images/cards/mars.png",
      "/images/cards/medusa.png",
      "/images/cards/mercury.png",
      "/images/cards/mermaid.png",
      "/images/cards/michael.png",
      "/images/cards/minerva.png",
      "/images/cards/minotaur.png",
      "/images/cards/mut.png",
      "/images/cards/nekhbet.png",
      "/images/cards/nemean_lion.png",
      "/images/cards/nixie.png",
      "/images/cards/nymph.png",
      "/images/cards/obsidian.png",
      "/images/cards/pegasus.png",
      "/images/cards/phoenix.png",
      "/images/cards/psyche.png",
      "/images/cards/rageul.png",
      "/images/cards/ramiel.png",
      "/images/cards/raphael.png",
      "/images/cards/samael.png",
      "/images/cards/satan.png",
      "/images/cards/satyr.png",
      "/images/cards/seahorse.png",
      "/images/cards/senu_mate.png",
      "/images/cards/seraph.png",
      "/images/cards/shika.png",
      "/images/cards/sol.png",
      "/images/cards/soma.png",
      "/images/cards/sorceress.png",
      "/images/cards/sphinx.png",
      "/images/cards/spirit_bird.png",
      "/images/cards/sprite.png",
      "/images/cards/succubus.png",
      "/images/cards/trent.png",
      "/images/cards/undead.png",
      "/images/cards/uriel.png",
      "/images/cards/vesta.png",
      "/images/cards/warlock.png",
      "/images/cards/water_spirit.png",
      "/images/cards/weever.png",
      "/images/cards/whiro.png",
      "/images/cards/wind_spirit.png",
      "/images/cards/wing_serpent.png",
      "/images/cards/zephyr.png",
      "/images/effects/active_card.gif",
      "/images/effects/blood.gif",
      "/images/effects/change_negative.gif",
      "/images/effects/change_positive.gif",
      "/images/effects/die.gif",
      "/images/effects/firework.gif",
      "/images/effects/magic_attack.gif",
      "/images/effects/magic_defense.gif",
      "/images/effects/melee_defense.gif",
      "/images/effects/missed.gif",
      "/images/effects/ranged_attack.gif",
      "/images/effects/ranged_defense.gif",
      "/images/back.png",
      "/images/back_bet.png",
      "/images/back_gamemenu.png",
      "/images/back_journey.png",
      "/images/back_leaderboard.png",
      "/images/back_player.png",
      "/images/back_sign.png",
      "/images/back_startgame.png",
    ]

    const loadImage = image => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.src = image
        // wait 2 seconds to simulate loading time
        loadImg.onload = () => resolve(image)
        loadImg.onerror = err => reject(err)
      })
    }

    Promise.all(IMAGES.map(image => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch(err => console.log("Failed to load images", err))
  })

  return (

    <Layout>
      {imgsLoaded == true &&
      <HomePage />}
    </Layout>
  );
}

export default Home;