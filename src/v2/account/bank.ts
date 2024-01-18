import { fetchAPI } from "../generics/request.js";

type AccountBank = {
  // The item's ID.
  id: number;
  // The amount of items in the item stack.
  count: number;
  // The amount of charges remaining on the item.
  charges?: number;
  // The skin applied to the item, if it is different from its original. Can be resolved against /v2/skins.
  skin?: number;
  // The IDs of the dyes applied to the item. Can be resolved against /v2/colors.
  dyes?: number[];
  // The item IDs of the runes or sigills applied to the item.
  upgrades?: number[];
  // The slot occupied by the upgrade at the corresponding position in upgrades.
  upgrade_slot_indices?: number[];
  // An array of item IDs for each infusion applied to the item.
  infusions?: number[];
  // The current binding of the item. Either Account or Character if present.
  binding?: "Account" | "Character";
  // If binding is Character, this field tells which character it is bound to.
  bound_to?: string;
  // The stats of the item.
  stats?: {
    // The ID of the stat combination. Can be resolved against /v2/itemstats.
    id: number;
    // The stats provided by this item.
    attributes: {
      AgonyResistance?: number;
      BoonDuration?: number;
      ConditionDamage?: number;
      ConditionDuration?: number;
      CritDamage?: number;
      Healing?: number;
      Power?: number;
      Precision?: number;
      Toughness?: number;
      Vitality?: number;
    };
  };
};

const bank = async (params: {
  access_token: string;
  page?: number;
  page_size?: number;
  v?: Date;
}) => {
  return await fetchAPI<AccountBank[]>({
    endpoint: "/account/bank",
    params,
  });
};

export { bank };
