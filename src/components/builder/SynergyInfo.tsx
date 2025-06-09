import type { SynergyData, Traits } from '@/types';
import synergyData from '@/data/synergy.json';
import Image from 'next/image';
import styles from './SynergyInfo.module.css';

export default function SynergyInfo({ trait }: { trait: Traits }) {
  const { traits } = synergyData as SynergyData;
  const traitInfo = traits.find((t) => t.name === trait.trait);
  if (!traitInfo) return null;
  const activate_level = traitInfo.activation.map((t) => t.unit_count);
  const levelIndex = activate_level.findIndex((level, idx) =>
    idx === activate_level.length - 1
      ? trait.count >= level
      : trait.count >= level && trait.count < activate_level[idx + 1],
  );

  const synergyColor = traitInfo.activation[levelIndex]?.color || '#A26A49';

  return (
    <div className={styles.synergyInfoWrapper}>
      <div
        className={styles.synergyImageHexagonWrapper}
        style={{
          backgroundColor: synergyColor,
        }}
      >
        <Image
          width={24}
          height={24}
          src={traitInfo.default_image}
          alt={trait.trait}
        />
      </div>
      <div className={styles.synergyDetailInfoWrapper}>
        <p>{trait.count}</p>
        <p>{trait.trait}</p>
      </div>
    </div>
  );
}
