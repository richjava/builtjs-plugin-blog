import dynamic from "next/dynamic";
import { language } from "./constants";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export async function getComponentMap(sections:any) {
  return new Promise(async (resolve) => {
    const map:any = {};
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if(!section.template){
        continue;
      }
      const template = section.template.doc;
      if(template.isDemo){
        map["section" + i] = import(
          `../demo/components/templates/${template.category}/${template.slug}/${template.slug}.${language === 'typescript' ? 'tsx' : 'jsx'}`
        );
      }else{
        map["section" + i] = import(
          `../components/plugins/${publicRuntimeConfig.NAMESPACE}/templates/${template.category}/${template.slug}/${template.slug}.${language === 'typescript' ? 'tsx' : 'jsx'}`
        );
      }
      
    }
    resolve(map);
  });
}

export function getComponents(sections:any) {
  return new Promise((resolve) => {
    getComponentMap(sections).then((map:any) => {
      let comps = [];
      for (const key of Object.keys(map)) {
        let comp = dynamic(() => map[key], {
          suspense: false,
        });
        comps.push(comp);
      }
      resolve(comps);
    });
  });
}