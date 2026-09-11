import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function TermosModal() {
  return (
    <Label className="text-fuchsia-blue-950 dark:text-fuchsia-blue-100 text-sm gap-1 flex items-center flex-wrap">
      Ao clicar em participar, você declara ser maior de 18 anos, e aceitar os{" "}
      
      <Dialog>
        <DialogTrigger asChild>
          <button 
            type="button"
            className="dark:hover:text-fuchsia-blue-700 hover:text-fuchsia-blue-950 no-underline hover:underline text-fuchsia-blue-500 bg-transparent border-none p-0 cursor-pointer text-sm inline"
          >
            termos de uso
          </button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-none bg-transparent shadow-none">
          <Card className="mx-auto w-full">
            <CardHeader>
              <CardTitle className="text-xl">Termos de Uso e Privacidade</CardTitle>
              <CardDescription>
                Conheça as políticas de privacidade e compromissos do Huddle.
              </CardDescription>
            </CardHeader>
            <CardContent className="-mb-(--card-spacing)">
              <div className="-mx-(--card-spacing) max-h-105 space-y-4 overflow-y-scroll border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed text-left">
                
                <p>
                  A sua privacidade é muito importante para nós. É política do Huddle respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar.
                </p>

                <p>
                  Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço, por meios justos e legais, com o seu conhecimento e consentimento.
                </p>

                <p>
                  Apenas retemos as informações coletadas pelo tempo necessário. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas, roubos e acessos não autorizados. Não compartilhamos informações publicamente, exceto por exigência legal.
                </p>

                <p>
                  O uso continuado de nosso site será considerado como aceitação de nossas práticas de privacidade. Se tiver dúvidas, entre em contato connosco.
                </p>

                <h4 className="font-semibold text-foreground pt-2">Anúncios e Cookies</h4>
                <p>
                  Usamos o Google AdSense para veicular publicidade com cookies DoubleClick para anúncios relevantes. Utilizamos anúncios para cobrir custos de funcionamento e futuros desenvolvimentos do Huddle.
                </p>

                <h4 className="font-semibold text-foreground pt-2">Compromisso do Usuário</h4>
                <p>O usuário compromete-se a:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Não se envolver em atividades ilegais ou contrárias à ordem pública;</li>
                  <li>Não difundir propaganda racista, xenofóbica, pornografia ilegal ou apologia ao terrorismo;</li>
                  <li>Não causar danos aos sistemas físicos (hardware) e lógicos (software) do Huddle ou de terceiros.</li>
                </ul>

                <p className="text-xs text-muted-foreground pt-2">
                  Esperemos que esteja esclarecido. Na dúvida, é mais seguro manter os cookies ativados caso interaja com os recursos do site.
                </p>

              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>{" "}
      do Huddle.
    </Label>
  )
}