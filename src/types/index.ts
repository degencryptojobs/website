export type AirtableJob = {
  id: string;
  title: string;
  company: string;
  date: string;
  logoUrl?: string;
  link: string;
  location: string;
  salary: string;
  description: string;
  tagString?: string;
  urlString?: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  date: string;
  link: string;
  location: string;
  salary: string;
  description: string;
  tags: string;
  pretty_url: string;
};

export type Company = {
  id: string;
  name: string;
  logo: Logo;
}

export type Logo = {
    id: string;
    width: number;
    height: number;                                                  
    url: string;
    filename: string;
    size: number
    type: string
    thumbnails: {
        small: {
            id: string;
            width: number;
            height: number;
            url: string;
        },
        large: {
            id: string;
            width: number;
            height: number;
            url: string;
        },
    };
}