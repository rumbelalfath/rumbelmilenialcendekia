import { Link } from '@tanstack/react-router'
import { AtSign, Globe, Phone } from 'lucide-react'

import { contact } from '@/data/site'
import { BrandMark } from './site-header'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Komunitas belajar non-formal di bidang pendidikan, sosial, dan
            kesehatan masyarakat. Mari tumbuh bersama — iman, ilmu, akhlak.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold uppercase text-navy">Jelajahi</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/#program" className="hover:text-primary">
                Program Utama
              </a>
            </li>
            <li>
              <a href="/#kegiatan" className="hover:text-primary">
                Linimasa Kegiatan
              </a>
            </li>
            <li>
              <Link to="/games" className="hover:text-primary">
                English Games
              </Link>
            </li>
            <li>
              <Link to="/games/buat" className="hover:text-primary">
                Buat Kuis Sendiri
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold uppercase text-navy">Hubungi</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <AtSign className="size-4" /> @{contact.instagram}
              </a>
            </li>
            <li>
              <a
                href={contact.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Globe className="size-4" /> {contact.website}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Phone className="size-4" /> {contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rumah Belajar Milenial Cendekia · Cinangka,
        Depok, Jawa Barat
      </div>
    </footer>
  )
}
