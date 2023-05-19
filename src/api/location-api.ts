import { APIKey, instance } from './instance'

export const locationAPI = {
   getLocation(location: string) {
      return instance.get(`/geo/1.0/direct?q=${location}&limit=5&appid=${APIKey}`)
   },
}
