import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Canal {
  id: string;
  tenantId: string;
  ativo: boolean;
  canalId: number;
  filialId: number;
  remetente: string;
}

export interface RespostaApi<T> {
  resultado: T;
}

export type Ambiente = 'dev' | 'staging' | 'producao';
const URL_BASES: Record<Ambiente, string> = {
  dev: 'https://api-dev-02.fagron.tech/openai/api/',
  staging: 'https://api-stg.pharmaphusion.com.br/openai/api/',
  producao: 'https://api-prod-01.pharmaphusion.com.br/openai/api/',
};

@Injectable({
  providedIn: 'root',
})
export class ConfiguracaoCanalService {
  private http = inject(HttpClient);

  // ambiente padrão (pode ser alterado)
  private ambiente: Ambiente = 'producao';

  // função para setar o ambiente
  setAmbiente(ambiente: Ambiente) {
    this.ambiente = ambiente;
  }

  // getter para baseUrl conforme ambiente
  private get baseUrl(): string {
    return URL_BASES[this.ambiente];
  }

  listarCanais(
    token: string,
    tenantId: string
  ): Observable<RespostaApi<Canal[]>> {
    const headers = new HttpHeaders({
      Authorization: token,
      'x-tenant-id': tenantId,
    });

    const url = `${this.baseUrl}canal/configuracao/tenant/${tenantId}`;
    return this.http.get<RespostaApi<Canal[]>>(url, { headers });
  }

  ativarCanal(id: string, token: string, tenantId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token,
      'x-tenant-id': tenantId,
    });

    const url = `${this.baseUrl}canal/configuracao/ativar/${id}`;
    return this.http.patch(url, {}, { headers });
  }

  desativarCanal(id: string, token: string, tenantId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token,
      'x-tenant-id': tenantId,
    });

    const url = `${this.baseUrl}canal/configuracao/desativar/${id}`;
    return this.http.patch(url, {}, { headers });
  }


  // futuramente outros métodos que usam this.baseUrl...
}
