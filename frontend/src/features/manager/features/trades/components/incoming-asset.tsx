import { Badge } from "@/components/ui/badge";
import { DraftPickDetail, PlayerDetail } from "@/types/types";

type IncomingAssetProps = {
  asset: PlayerDetail | DraftPickDetail;
};

function isPlayerDetail(
  asset: PlayerDetail | DraftPickDetail
): asset is PlayerDetail {
  return (asset as PlayerDetail).fname != undefined;
}

function IncomingAsset({ asset }: IncomingAssetProps) {
  if (isPlayerDetail(asset)) {
    return (
      <Badge className="bg-aff-orange hover:bg-amber-600 ">
        <img
          className="w-6 mr-2 rounded-full"
          src={`/players/${asset?.fname}_${asset?.lname}.png`}
        />
        {asset.fname[0]}. {asset.lname}{" "}
      </Badge>
    );
  }
  return (
    <Badge className="bg-aff-orange hover:bg-amber-600">
      {asset.season_id + 2021} Rd. {asset.round_num}{" "}
      {asset.pick_num && <>({asset.pick_num})</>}
    </Badge>
  );
}

export default IncomingAsset;
