import { ProvinceCommonType, AddressToSave } from "@Common/types";
import provinceApi from "./province.api";

class ProvinceService {
  async getAllProvince():  Promise<ProvinceCommonType[]> {
    try {
      const res= await provinceApi.get<ProvinceCommonType[]>("/p");
      console.log("object", res);
      return res as unknown  as ProvinceCommonType[];
    } catch (error) {
      console.error("error getAllProvince", error);
      return [];
    }
  }

  async getProvince(code: number): Promise<ProvinceCommonType|null> {
    try {
      const res=await provinceApi.get<ProvinceCommonType>(`/p/${code}`)
      console.log("object555", res);
      return res as unknown as ProvinceCommonType;
    } catch (error) {
      console.error("error getProvince", error);
      return null
    }
  }

  async getDistrictByProvinceCode(code: number): Promise<ProvinceCommonType[]> {
    try {
      return provinceApi
            .get<ProvinceCommonType[]>("/d", {
              params: {
                p: code,
              },
            })
            .then();
    } catch (error) {
      console.error("error getDistrictByProvinceCode", error);
      return []
    }

  }

  async getDistrict(code: number): Promise<ProvinceCommonType> {
    return provinceApi.get<ProvinceCommonType>(`/d/${code}`).then();
  }

  async getWardByDistrictCode(code: number): Promise<ProvinceCommonType[]> {
    return provinceApi
      .get<ProvinceCommonType[]>("/w", {
        params: {
          d: code,
        },
      })
      .then();
  }

  async getWard(code: number): Promise<ProvinceCommonType> {
    return provinceApi.get<ProvinceCommonType>(`/w/${code}`).then();
  }

  async getAddress(data: AddressToSave): Promise<string> {
    console.log("object123", data);
    let province = await this.getProvince(data.provinceCode);
    let district = await this.getDistrict(data.districtCode);
    let ward = await this.getWard(data.wardCode);

    console.log("province", province);
    console.log("district", district);
    console.log("ward", ward);
    let address =
      data.addressDetail +
      " , " +
      ward.name +
      " , " +
      district.name +
      " , " +
      province?.name;
    return address;
  }
}

export default new ProvinceService();
