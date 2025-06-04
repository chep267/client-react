/**
 *
 * @author dongntd267@gmail.com
 *
 */

import { readdir, readFile } from 'fs/promises';
import { extname, join, resolve } from 'path';

class FileSizeChecker {
    private readonly rootDir: string;
    private readonly maxLines: number;
    private readonly maxWords: number;
    private readonly validExtensions: string[];
    private readonly colors = {
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        reset: '\x1b[0m',
        bold: '\x1b[1m',
    };

    constructor(payload: { rootDir?: string; maxLines?: number; maxWords?: number; validExtensions?: string[] }) {
        const {
            rootDir = './src',
            maxLines = 200,
            maxWords = 600,
            validExtensions = ['.js', '.jsx', '.ts', '.tsx'],
        } = payload;
        this.rootDir = rootDir;
        this.maxLines = maxLines;
        this.maxWords = maxWords;
        this.validExtensions = validExtensions;
    }

    private print(color: string, message: string) {
        console.log(`${color}${message}${this.colors.reset}`);
    }

    private async getAllFiles(dir: string): Promise<string[]> {
        const direntList = await readdir(dir, { withFileTypes: true });
        const files = await Promise.all(
            direntList.map((dirent) => {
                const res = join(dir, dirent.name);
                return dirent.isDirectory() ? this.getAllFiles(res) : res;
            })
        );
        return files.flat();
    }

    private countWords(content: string): number {
        const cleaned = content.replace(/[^a-zA-Z0-9_]/g, ' ');
        return cleaned.trim().split(/\s+/).filter(Boolean).length;
    }

    private async checkFile(filePath: string) {
        const content = await readFile(filePath, 'utf8');
        const lines = content.split('\n').length;
        const words = this.countWords(content);

        if (lines > this.maxLines || words > this.maxWords) {
            const absPath = resolve(filePath);
            this.print(this.colors.red, absPath);
            console.log(`  1:1  warning  File too large — ${lines} lines, ${words} words  rule/file-size\n`);
        }
    }

    public async run() {
        const allFiles = await this.getAllFiles(this.rootDir);
        const codeFiles = allFiles.filter((file) => {
            const ext = extname(file);
            const inSvgFolder = file.includes('/svg/');
            const isDtsFile = file.endsWith('.d.ts');
            return this.validExtensions.includes(ext) && !inSvgFolder && !isDtsFile;
        });

        for (const file of codeFiles) {
            await this.checkFile(file);
        }

        this.print(this.colors.green, '✅ Check completed');
    }
}

// ---- Run ----
const checker = new FileSizeChecker({
    rootDir: './src',
    maxLines: 200,
    maxWords: 600,
});
checker.run().catch(console.error);
