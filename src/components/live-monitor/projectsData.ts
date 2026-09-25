import { ProjectConfig } from './types';

export const MONITOR_PROJECTS: ProjectConfig[] = [
  {
    id: 'ai-visa-interview',
    name: 'Voice AI Consular Pipeline',
    tagline: 'Real-Time Full-Duplex Audio & VAD (AWS EC2)',
    previewUrl: 'http://localhost:3000/interview-session',
    files: [
      {
        name: 'audioStreamer.ts',
        icon: 'ts',
        code: `import { WebSocket } from 'ws';
import { BertVAD } from './vadModel';
import { synthesizeAudioChunk } from './ttsPipeline';

export class VoiceOrchestrator {
  private vad = new BertVAD({ threshold: 0.88 });
  private isSpeaking = false;

  async handleAudioFrame(ws: WebSocket, chunk: Buffer) {
    const isSpeechEnd = await this.vad.isEndOfThought(chunk);
    
    if (isSpeechEnd && !this.isSpeaking) {
      this.isSpeaking = true;
      const prompt = await this.transcribeBuffer(chunk);
      
      // Stream tokens to TTS with sub-second turnaround
      for await (const audioPacket of synthesizeAudioChunk(prompt)) {
        ws.send(audioPacket, { binary: true });
      }
      this.isSpeaking = false;
    }
  }
}`,
      },
      {
        name: 'vadModel.ts',
        icon: 'ts',
        code: `import * as ort from 'onnxruntime-node';

export class BertVAD {
  private session!: ort.InferenceSession;

  async init() {
    this.session = await ort.InferenceSession.create(
      './models/bert_vad_quantized.onnx',
      { executionProviders: ['cpu'] }
    );
    console.log('[VAD] ONNX runtime session initialized.');
  }

  async isEndOfThought(audioFeatures: Float32Array): Promise<boolean> {
    const tensor = new ort.Tensor('float32', audioFeatures, [1, 512]);
    const output = await this.session.run({ input: tensor });
    return (output.probabilities.data[0] as number) > 0.88;
  }
}`,
      },
      {
        name: 'package.json',
        icon: 'json',
        code: `{
  "name": "voice-ai-consular",
  "version": "2.4.0",
  "dependencies": {
    "onnxruntime-node": "^1.19.0",
    "ws": "^8.18.0",
    "typescript": "^5.8.2"
  }
}`,
      },
    ],
  },
  {
    id: 'spare-parts-erp',
    name: 'Spare-Parts ERP Engine',
    tagline: '10M+ SKU Inventory & Windowed Virtualization',
    previewUrl: 'http://localhost:3000/inventory/live-matrix',
    files: [
      {
        name: 'VirtualizedCatalog.tsx',
        icon: 'react',
        code: `import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useMemo } from 'react';

export function VirtualizedInventory({ skus }: { skus: PartRecord[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: 10_000_000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  return (
    <div ref={parentRef} className="h-150 overflow-auto border border-border">
      <div style={{ height: \`\${rowVirtualizer.getTotalSize()}px\`, position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            className="absolute top-0 left-0 w-full flex items-center px-4"
            style={{ transform: \`translateY(\${virtualRow.start}px)\` }}
          >
            <span>SKU-\${virtualRow.index.toString().padStart(8, '0')}</span>
            <span className="text-emerald-400 font-mono text-xs">QUERY: 42ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
      {
        name: 'skuOptimizer.sql',
        icon: 'sql',
        code: `-- Compound index optimization on high-frequency warehouse barcode lookup
CREATE INDEX CONCURRENTLY idx_parts_warehouse_sku 
ON inventory_parts (warehouse_id, sku_code, is_active)
INCLUDE (unit_cost, stock_quantity);

-- Reduced query latency from 10.4s timeout down to 42ms response
EXPLAIN ANALYZE
SELECT id, sku_code, stock_quantity 
FROM inventory_parts 
WHERE warehouse_id = 4 AND is_active = true 
ORDER BY last_mutated_at DESC 
LIMIT 100;`,
      },
    ],
  },
  {
    id: 'afrilearn-platform',
    name: 'Afrilearn Flagship Web',
    tagline: 'Next.js 15 App Router & 100/100 Lighthouse Optimization',
    previewUrl: 'http://localhost:3000/learn/interactive',
    files: [
      {
        name: 'page.tsx',
        icon: 'react',
        code: `import { Suspense } from 'react';
import { CourseGrid } from '@/components/CourseGrid';
import { PerformanceBadge } from '@/components/PerformanceBadge';

export default async function LearningPortal() {
  return (
    <main className="min-h-screen bg-surface p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Afrilearn Platform</h1>
        <PerformanceBadge metric="Lighthouse" score="100/100" />
      </header>
      <Suspense fallback={<div className="h-64 animate-pulse bg-muted/20" />}>
        <CourseGrid />
      </Suspense>
    </main>
  );
}`,
      },
    ],
  },
];
